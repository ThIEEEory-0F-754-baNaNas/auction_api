import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { AuctionItemService } from '../services/AuctionItemService';
import { AuctionItemController } from '../controllers/AuctionItemController';
import { FileModule } from '../utils/files/FileModule';

@Module({
  imports: [PrismaModule, FileModule],
  controllers: [AuctionItemController],
  providers: [AuctionItemService],
})
export class AuctionItemModule {}
