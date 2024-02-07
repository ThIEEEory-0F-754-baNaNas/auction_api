import { BadRequestException, Injectable } from '@nestjs/common';
import { AuctionStakeRepository } from '../repositories/AuctionStakeRepository';
import { CreateAuctionStakeDto } from '../dtos/CreateAuctionStakeDto';

@Injectable()
export class AuctionStakeService {
  constructor(private auctionStakeRepository: AuctionStakeRepository) {}

  async create(data: CreateAuctionStakeDto, userId: string) {
    if (!(await this.isPriceBiggest(data.price))) {
      throw new BadRequestException('Larger price exists');
    }

    return this.auctionStakeRepository.create({
      auctionItemId: data.auctionId,
      price: data.price,
      userId,
    });
  }

  async isPriceBiggest(stakePrice: number) {
    const stake = await this.auctionStakeRepository.findFirst({
      orderBy: {
        price: 'desc',
      },
    });

    return !stake?.price ? true : stakePrice > stake?.price;
  }
}
