import { BadRequestException, Injectable } from '@nestjs/common';
import { AuctionItemRepository } from '../repositories/AuctionItemRepository';
import { CreateAuctionItemDTO } from '../dtos/CreateAuctionItemDTO';
import { UpdateAuctionItemDTO } from '../dtos/UpdateAuctionItemDTO';

@Injectable()
export class AuctionItemService {
  constructor(private auctionItemRepository: AuctionItemRepository) {}

  create(data: CreateAuctionItemDTO, userId: string) {
    const endTime = new Date(data.endTime);

    if (endTime.getTime() < Date.now()) {
      throw new BadRequestException('Wrong date provided');
    }

    return this.auctionItemRepository.create({
      ...data,
      endTime: endTime.toISOString(),
      userId: userId,
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
