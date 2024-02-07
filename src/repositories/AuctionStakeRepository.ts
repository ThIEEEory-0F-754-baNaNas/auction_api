import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuctionStakeRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.AuctionStakeUncheckedCreateInput) {
    return this.prismaService.auctionStake.create({ data });
  }

  async findFirst(args: Prisma.AuctionStakeFindFirstArgs) {
    return this.prismaService.auctionStake.findFirst(args);
  }
}
