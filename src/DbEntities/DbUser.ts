import { AuctionItem, AuctionStake, Message } from '@prisma/client';

export class DbUser {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  balance: bigint;
  password: string;
  auctionStakes: AuctionStake[];
  auctionItems: AuctionItem[];
  messages: Message[];
}
