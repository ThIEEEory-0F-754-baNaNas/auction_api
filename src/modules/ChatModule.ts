import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { ChatController } from '../controllers/ChatController';
import { ChatService } from '../services/ChatService';

@Module({
  imports: [PrismaModule],
  exports: [ChatService, AuctionByIdPipe],
  providers: [ChatService, AuctionByIdPipe],
  controllers: [ChatController],
})
export class ChatModule {}
