import { BadRequestException, Injectable } from '@nestjs/common';
import { AuctionStakeRepository } from '../repositories/AuctionStakeRepository';
import { CreateAuctionStakeDto } from '../dtos/CreateAuctionStakeDto';
import { UserRepository } from '../repositories/UserRepository';
import { AuctionItemRepository } from '../repositories/AuctionItemRepository';

@Injectable()
export class AuctionStakeService {
  constructor(
    private auctionStakeRepository: AuctionStakeRepository,
    private userRepository: UserRepository,
    private auctionItemRepository: AuctionItemRepository,
  ) {}

  async create(data: CreateAuctionStakeDto, userId: string) {
    if (!(await this.isBiggestPriceStake(data.price, data.auctionId))) {
      throw new BadRequestException('Larger price exists');
    }

    const auction = await this.auctionItemRepository.findById(data.auctionId);
    const biggestStake = await this.getBiggestStake(auction.id);

    if (
      !biggestStake &&
      data.price - Number(auction.startPrice) < auction.minPriceStep
    ) {
      throw new BadRequestException(
        `Min price for this auction is ${auction.startPrice + auction.minPriceStep}`,
      );
    }

    const user = await this.userRepository.findById(userId);

    if (Number(user.balance) - data.price < 0) {
      throw new BadRequestException('Not enough credits on balance');
    }

    await this.userRepository.updateById(userId, {
      balance: Number(user.balance) - data.price,
    });

    return this.auctionStakeRepository.create({
      auctionItemId: data.auctionId,
      price: data.price,
      userId,
    });
  }

  async isBiggestPriceStake(price: number, auctionItemId: string) {
    const stake = await this.getBiggestStake(auctionItemId);

    return !stake?.price ? true : price > stake?.price;
  }

  getBiggestStake(auctionItemId: string) {
    return this.auctionStakeRepository.findFirst({
      where: {
        auctionItemId,
      },
      orderBy: {
        price: 'desc',
      },
    });
  }
}
