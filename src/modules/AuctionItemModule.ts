import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { AuctionItemService } from '../services/AuctionItemService';
import { AuctionItemController } from '../controllers/AuctionItemController';

@Module({
  imports: [PrismaModule],
  controllers: [AuctionItemController],
  providers: [AuctionItemService],
})
export class AuctionItemModule {}
