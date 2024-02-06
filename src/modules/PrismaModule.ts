import { Module } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { UserRepository } from '../repositories/UserRepository';
import { AuctionItemRepository } from '../repositories/AuctionItemRepository';

@Module({
  exports: [PrismaService, UserRepository, AuctionItemRepository],
  providers: [PrismaService, UserRepository, AuctionItemRepository],
})
export class PrismaModule {}
