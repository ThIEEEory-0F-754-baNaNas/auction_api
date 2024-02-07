import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: Prisma.ChatUncheckedCreateInput) {
    return this.prismaService.chat.create({ data });
  }

  updateById(id: string, data: Prisma.ChatUncheckedUpdateInput) {
    return this.prismaService.chat.update({ where: { id }, data });
  }

  find(where: Prisma.ChatWhereInput) {
    return this.prismaService.chat.findFirst({ where });
  }

  createMessage(data: Prisma.MessageUncheckedCreateInput) {
    return this.prismaService.message.create({ data });
  }
}
