import { DbAuctionItem } from '../DbEntities/DbAuctionItem';

export class AuctionItemMapper {
  getAuctionItem(a: DbAuctionItem) {
    return {
      id: a.id,
      title: a.title,
      description: a.description,
      images: a.images,
      startPrice: a.startPrice,
      minPriceStep: a.minPriceStep,
      createdAt: a.createdAt,
      startTime: a.startTime,
      endTime: a.endTime,
      userId: a.userId,
    };
  }
}
