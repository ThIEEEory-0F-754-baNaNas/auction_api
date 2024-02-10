import { AuctionItem } from '@prisma/client';
import { DbMessage } from './DbMessage';

export class DbChat {
  id: string;
  auctionItem: AuctionItem;
  auctionItemId: string;
  messages: DbMessage[];
}
