import { Injectable, PipeTransform } from '@nestjs/common';
import { DoesNotExistException } from '../exceptions/DoesNotExistException';
import { AuctionItemRepository } from '../repositories/AuctionItemRepository';

@Injectable()
export class AuctionByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor(private auctionItemRepository: AuctionItemRepository) {}

  async transform(auctionId: string): Promise<string> {
    const auction = await this.auctionItemRepository.findById(auctionId);
    if (!auction) {
      throw new DoesNotExistException('auction');
    }
    return auctionId;
  }
}
