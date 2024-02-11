import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageRepository {
  constructor(private prismaService: PrismaService) {}

  async findMany(args: Prisma.MessageFindManyArgs) {
    return this.prismaService.message.findMany(args);
  }
}
