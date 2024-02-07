import { Module } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { UserRepository } from '../repositories/UserRepository';
import { AuctionItemRepository } from '../repositories/AuctionItemRepository';
import { ChatRepository } from '../repositories/ChatRepository';

@Module({
  exports: [
    PrismaService,
    UserRepository,
    AuctionItemRepository,
    ChatRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    AuctionItemRepository,
    ChatRepository,
  ],
})
export class PrismaModule {}
