import { BadRequestException, Injectable } from '@nestjs/common';
import { AuctionItemRepository } from '../repositories/AuctionItemRepository';
import { CreateAuctionItemDTO } from '../dtos/CreateAuctionItemDTO';
import { UpdateAuctionItemDTO } from '../dtos/UpdateAuctionItemDTO';
import { ChatRepository } from '../repositories/ChatRepository';

@Injectable()
export class AuctionItemService {
  constructor(
    private readonly auctionItemRepository: AuctionItemRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

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
}
