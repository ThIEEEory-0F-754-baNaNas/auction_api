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
const MIN_TIME_INTERVAL = 20;

@Injectable()
export class AuctionItemService {
  constructor(
    private readonly auctionItemRepository: AuctionItemRepository,
    private readonly chatRepository: ChatRepository,
    private readonly fileService: FileService,
  ) {}

  async getAll(query: QueryAllAuctionItemsDTO) {
    const AND = [
      query?.active === 'true'
        ? {
            endTime: {
              gt: new Date(Date.now()).toISOString(),
            },
            startTime: {
              lt: new Date(Date.now()).toISOString(),
            },
          }
        : {},
      query?.search
        ? {
            title: {
              contains: query.search,
            },
          }
        : {},
    ];

    const pagination =
      query.page && query.pageSize
        ? {
            skip: query.page * query.pageSize,
            take: +query.pageSize,
          }
        : {};

    const sort =
      query.sort === SortQAAIParam.auctionStakes
        ? {
            orderBy: {
              auctionStakes: {
                _count: query?.order || 'asc',
              },
            },
          }
        : this.getSort(query, SortQAAIParam.endTime);

    return this.auctionItemRepository.findMany({
      where: {
        AND,
      },
      ...pagination,
      ...sort,
    });
  }

  getSort({ sort, order = 'asc' }: SortDTO, standardField: SortQAAIParam) {
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

  async getAllByUserId(query: QueryAllAuctionItemsDTO, userId: string) {
    const allAuctions = await this.getAll(query);
    return allAuctions.filter((a) => a.userId === userId);
  }

  async create(
    data: CreateAuctionItemDTO,
    userId: string,
    photos: Array<Express.Multer.File>,
  ) {
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    if (endTime.getTime() < Date.now() || startTime.getTime() < Date.now()) {
      throw new BadRequestException('Wrong end date provided');
    }

    const differenceTimeMinutes =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60);

    if (differenceTimeMinutes < MIN_TIME_INTERVAL) {
      throw new BadRequestException(
        `Minimum interval between dates is ${MIN_TIME_INTERVAL} minutes`,
      );
    }

    const images = [];
    for (const photo of photos) {
      const path = await this.fileService.saveByHash(photo, 'images');
      images.push(path);
    }

    const auction = await this.auctionItemRepository.create({
      ...data,
      images,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      user: { connect: { id: userId } },
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
}
