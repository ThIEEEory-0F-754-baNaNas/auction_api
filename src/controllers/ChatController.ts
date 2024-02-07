import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { CreateMessageDTO } from '../dtos/CreateMessageDTO';
import { JWTGuard } from '../guards/JWTGuard';
import { ChatService } from '../services/ChatService';

@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @UseGuards(JWTGuard)
  @Post('/:auctionId')
  postMessage(
    @Param('auctionId', AuctionByIdPipe) auctionId: string,
    @Body() body: CreateMessageDTO,
    @Req() req,
  ) {
    return this.chatService.createMessage(auctionId, req.user.id, body);
  }
}
