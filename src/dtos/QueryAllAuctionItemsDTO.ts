import { QueryAllDTO } from './QueryAllDTO';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export enum SortQAAIParam {
  START_PRICE = 'startPrice',
  END_TIME = 'endTime',
  AUCTION_STAKES = 'auctionStakes',
}

export class QueryAllAuctionItemsDTO extends QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Sorting parameter',
    type: SortQAAIParam,
  })
  sort?: SortQAAIParam;

  @ApiPropertyOptional({
    description: 'Search by title',
  })
  @IsString()
  search?: string;
}
