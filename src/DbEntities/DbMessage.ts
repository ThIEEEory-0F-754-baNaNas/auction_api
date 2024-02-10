import { DbUser } from './DbUser';
import { DbChat } from './DbChat';

export class DbMessage {
  id: string;
  text: string;
  user: DbUser;
  userId: string;
  createdAt: Date;
  chat: DbChat;
  chatId: string;
}
