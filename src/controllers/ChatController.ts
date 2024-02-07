import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { CreateMessageDTO } from '../dtos/CreateMessageDTO';
import { JWTGuard } from '../guards/JWTGuard';
import { ChatService } from '../services/ChatService';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostMessageResponse } from '../responses/PostMessageResponse';

@ApiTags('Chat')
@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Post message to the chat by auction id to which it belongs',
  })
  @ApiOkResponse({
    type: PostMessageResponse,
  })
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
