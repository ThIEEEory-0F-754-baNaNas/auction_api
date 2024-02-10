import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { ChatMapper } from '../mappers/ChatMapper';
import { ChatResponse } from '../responses/ChatResponse';

@ApiTags('Chat')
@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatMapper: ChatMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Post message to the chat by auction id to which it belongs',
  })
  @ApiOkResponse({
    type: PostMessageResponse,
  })
  @UseGuards(JWTGuard)
  @Post('/auctionItems/:auctionId/chat')
  postMessage(
    @Param('auctionId', AuctionByIdPipe) auctionId: string,
    @Body() body: CreateMessageDTO,
    @Req() req,
  ) {
    return this.chatService.createMessage(auctionId, req.user.id, body);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get messages in chat by auctionItemId',
  })
  @ApiOkResponse({
    type: ChatResponse,
  })
  @UseGuards(JWTGuard)
  @Get('/auctionItems/:auctionId/chat')
  async get(@Param('auctionId', AuctionByIdPipe) auctionId: string) {
    const chat = await this.chatService.get(auctionId);
    return this.chatMapper.getChat(chat);
  }
}
