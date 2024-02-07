import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAuctionStakeDto } from '../dtos/CreateAuctionStakeDto';
import { AuctionStakeService } from '../services/AuctionStakeService';
import { CreateAuctionStakePipe } from '../pipes/CreateAuctionStakePipe';
import { JWTGuard } from '../guards/JWTGuard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuctionStakeResponse } from '../responses/AuctionStakeResponse';

@ApiTags('AuctionStakes')
@Controller('/auctionStakes')
export class AuctionStakeController {
  constructor(private AuctionStakeService: AuctionStakeService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create stake on auction for specific user',
  })
  @ApiOkResponse({
    type: AuctionStakeResponse,
  })
  @UseGuards(JWTGuard)
  @Post()
  async create(
    @Body(CreateAuctionStakePipe) body: CreateAuctionStakeDto,
    @Req() req,
  ): Promise<AuctionStakeResponse> {
    return this.AuctionStakeService.create(body, req.user.id);
  }
}
