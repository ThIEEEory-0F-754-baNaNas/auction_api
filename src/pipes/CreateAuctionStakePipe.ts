import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateAuctionStakeDto } from '../dtos/CreateAuctionStakeDto';
import { AuctionByIdPipe } from './AuctionByIdPipe';

@Injectable()
export class CreateAuctionStakePipe implements PipeTransform {
  constructor(private auctionByIdPipe: AuctionByIdPipe) {}

  async transform(data: CreateAuctionStakeDto): Promise<CreateAuctionStakeDto> {
    await this.auctionByIdPipe.transform(data.auctionId);
    return data;
  }
}
