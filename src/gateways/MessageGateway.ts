import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessageRepository } from '../repositories/MessageRepository';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'messages',
})
export class MessageGateway {
  constructor(private messageRepository: MessageRepository) {}

  @SubscribeMessage('new-chat-message')
  async findAll(@MessageBody('chatId') chatId: string) {
    const messages = await this.messageRepository.findMany({
      where: {
        chatId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return { event: 'new-chat-message', data: messages };
  }
}
