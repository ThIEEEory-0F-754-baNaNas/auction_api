import { Module } from '@nestjs/common';
import { PrismaModule } from './PrismaModule';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { ChatController } from '../controllers/ChatController';
import { ChatService } from '../services/ChatService';
import { ChatMapper } from '../mappers/ChatMapper';
import { MessageGateway } from '../gateways/MessageGateway';

@Module({
  imports: [PrismaModule],
  exports: [ChatService, AuctionByIdPipe, ChatMapper],
  providers: [ChatService, AuctionByIdPipe, ChatMapper, MessageGateway],
  controllers: [ChatController],
})
export class ChatModule {}
