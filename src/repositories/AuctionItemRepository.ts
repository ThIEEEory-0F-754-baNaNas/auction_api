import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/PrismaService';

@Injectable()
export class AuctionItemRepository {
  constructor(private prismaService: PrismaService) {}

  private include = {
    auctionStakes: true,
    chat: {
      include: {
        messages: true,
      },
    },
  };

  async findMany(args: Prisma.AuctionItemFindManyArgs) {
    return this.prismaService.auctionItem.findMany(args);
  }

  async create(data: Prisma.AuctionItemCreateInput) {
    return this.prismaService.auctionItem.create({ data });
  }

  async findById(id: string) {
    return this.prismaService.auctionItem.findUnique({
      where: {
        id,
      },
      include: this.include,
    });
  }

  async update(id: string, data: Prisma.AuctionItemUncheckedUpdateInput) {
    return this.prismaService.auctionItem.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.auctionItem.delete({
      where: {
        id,
      },
    });
  }
}
