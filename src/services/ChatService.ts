import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../repositories/ChatRepository';
import { CreateMessageDTO } from '../dtos/CreateMessageDTO';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async createMessage(
    auctionId: string,
    userId: string,
    body: CreateMessageDTO,
  ) {
    const chat = await this.chatRepository.find({ auctionItemId: auctionId });

    const message = await this.chatRepository.createMessage({
      chatId: chat.id,
      userId,
      ...body,
    });

    return this.chatRepository.updateById(chat.id, {
      messages: {
        connect: message,
      },
    });
  }

  get(auctionItemId: string) {
    return this.chatRepository.find({ auctionItemId });
  }
}
