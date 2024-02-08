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

@Injectable()
export class AuctionItemService {
  constructor(
    private readonly auctionItemRepository: AuctionItemRepository,
    private readonly chatRepository: ChatRepository,
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

  async create(data: CreateAuctionItemDTO, userId: string) {
    const endTime = new Date(data.endTime);

    if (endTime.getTime() < Date.now()) {
      throw new BadRequestException('Wrong date provided');
    }

    const auction = await this.auctionItemRepository.create({
      ...data,
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

  update(id: string, data: UpdateAuctionItemDTO) {
    return this.auctionItemRepository.update(id, {
      ...data,
      images: {
        push: data.images,
      },
    });
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
