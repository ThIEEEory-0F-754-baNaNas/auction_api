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

  async create(
    auctionItemId: string,
    data: CreateAuctionStakeDto,
    userId: string,
  ) {
    const auction = await this.auctionItemRepository.findById(auctionItemId);

    if (auction.userId === userId) {
      throw new BadRequestException('Owner can`t bet on his own auction');
    }

    const biggestStake = await this.getBiggestStake(auction.id);

    if (
      !(await this.isBiggestPriceStake(
        data.price,
        auctionItemId,
        Number(auction.minPriceStep),
      ))
    ) {
      throw new BadRequestException('Larger price exists');
    }

    if (!biggestStake && data.price < auction.startPrice) {
      throw new BadRequestException('Price is too low');
    }

    const user = await this.userRepository.findById(userId);

    if (Number(user.balance) - data.price < 0) {
      throw new BadRequestException('Not enough credits on balance');
    }

    await this.userRepository.updateById(userId, {
      balance: Number(user.balance) - data.price,
    });

    if (biggestStake) {
      await this.auctionStakeRepository.update({
        where: { id: biggestStake.id },
        data: {
          user: {
            update: {
              balance: {
                increment: biggestStake.price,
              },
            },
          },
        },
      });
    }

    return this.auctionStakeRepository.create({
      auctionItemId,
      price: data.price,
      userId,
    });
  }

  async isBiggestPriceStake(
    price: number,
    auctionItemId: string,
    minStep: number,
  ) {
    const stake = await this.getBiggestStake(auctionItemId);

    return !stake?.price ? true : price - Number(stake?.price) >= minStep;
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

  getAllByAuctionId(auctionItemId: string) {
    return this.auctionStakeRepository.findManyByAuctionId(auctionItemId);
  }
}
