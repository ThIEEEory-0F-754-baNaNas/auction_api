import { Module } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { UserRepository } from '../repositories/UserRepository';
import { AuctionItemRepository } from '../repositories/AuctionItemRepository';
import { ChatRepository } from '../repositories/ChatRepository';
import { AuctionStakeRepository } from '../repositories/AuctionStakeRepository';

@Module({
  exports: [
    PrismaService,
    UserRepository,
    AuctionItemRepository,
    ChatRepository,
    AuctionStakeRepository,
  ],
  providers: [
    PrismaService,
    UserRepository,
    AuctionItemRepository,
    ChatRepository,
    AuctionStakeRepository,
  ],
})
export class PrismaModule {}
