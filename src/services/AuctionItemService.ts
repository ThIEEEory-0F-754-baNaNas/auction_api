import { BadRequestException, Injectable } from '@nestjs/common';
import { AuctionItemRepository } from '../repositories/AuctionItemRepository';
import { CreateAuctionItemDTO } from '../dtos/CreateAuctionItemDTO';
import { UpdateAuctionItemDTO } from '../dtos/UpdateAuctionItemDTO';
import { ChatRepository } from '../repositories/ChatRepository';
import { SortDTO } from '../dtos/QueryAllDTO';
import {
  QueryAllAuctionItemsDTO,
  SortQAAIParam,
} from '../dtos/QueryAllAuctionItemsDTO';
import { FileService } from '../utils/files/FileService';
import { RemoveImagesDTO } from '../dtos/RemoveImagesDTO';

const MAX_IMAGES_FOR_ITEM = 6;

@Injectable()
export class AuctionItemService {
  constructor(
    private readonly auctionItemRepository: AuctionItemRepository,
    private readonly chatRepository: ChatRepository,
    private readonly fileService: FileService,
  ) {}

  getAll(query: QueryAllAuctionItemsDTO) {
    const where = query?.search
      ? {
          where: {
            title: {
              contains: query.search,
            },
          },
        }
      : {};

    const pagination =
      query.page && query.pageSize
        ? {
            skip: query.page * query.pageSize,
            take: +query.pageSize,
          }
        : {};

    const sort =
      query.sort === SortQAAIParam.AUCTION_STAKES
        ? {
            orderBy: {
              auctionStakes: {
                _count: query?.order || 'asc',
              },
            },
          }
        : this.getSort(query, SortQAAIParam.END_TIME);

    return this.auctionItemRepository.findMany({
      ...pagination,
      ...sort,
      ...where,
    });
  }

  async create(
    data: CreateAuctionItemDTO,
    userId: string,
    photos: Array<Express.Multer.File>,
  ) {
    const endTime = new Date(data.endTime);

    if (endTime.getTime() < Date.now()) {
      throw new BadRequestException('Wrong date provided');
    }

    const images = [];
    for (const photo of photos) {
      const path = await this.fileService.saveByHash(photo, 'images');
      images.push(path);
    }

    const auction = await this.auctionItemRepository.create({
      ...data,
      images,
      endTime: endTime.toISOString(),
      userId: userId,
    });

    const chat = await this.chatRepository.create({
      auctionItemId: auction.id,
    });

    return this.auctionItemRepository.update(auction.id, {
      chat: { connect: { id: chat.id } },
    });
  }

  getById(auctionId: string) {
    return this.auctionItemRepository.findById(auctionId);
  }

  async update(
    id: string,
    data: UpdateAuctionItemDTO,
    photos: Array<Express.Multer.File>,
  ) {
    const { images } = await this.auctionItemRepository.findById(id);
    if (images.length + photos.length > MAX_IMAGES_FOR_ITEM) {
      throw new BadRequestException('Excessive amount of images per item');
    }

    for (const photo of photos) {
      const path = await this.fileService.saveByHash(photo, 'images');
      images.push(path);
    }

    return this.auctionItemRepository.update(id, {
      ...data,
      images,
    });
  }

  async removeImages(id: string, { photos }: RemoveImagesDTO) {
    const { images } = await this.auctionItemRepository.findById(id);

    if (photos.some((photo) => !images.includes(photo))) {
      throw new BadRequestException('Some images do not belong to this item');
    }

    for (const photo of photos) {
      images.splice(images.indexOf(photo), 1);
      if (this.fileService.checkFileExist(photo)) {
        await this.fileService.deleteFile(photo);
      }
    }

    return this.auctionItemRepository.update(id, { images });
  }

  delete(id: string) {
    return this.auctionItemRepository.delete(id);
  }

  getSort({ sort, order = 'asc' }: SortDTO, standardField: string) {
    if (!sort)
      return {
        orderBy: {
          [standardField]: order,
        },
      };
    return {
      orderBy: {
        [sort]: order,
      },
    };
  }
}
