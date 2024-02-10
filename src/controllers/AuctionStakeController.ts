import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAuctionStakeDto } from '../dtos/CreateAuctionStakeDto';
import { AuctionStakeService } from '../services/AuctionStakeService';
import { JWTGuard } from '../guards/JWTGuard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuctionStakeResponse,
  AuctionStakeWithUserResponse,
} from '../responses/AuctionStakeResponse';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { AuctionStakesMapper } from '../mappers/AuctionStakesMapper';

@ApiTags('AuctionStakes')
@Controller()
export class AuctionStakeController {
  constructor(
    private readonly auctionStakeService: AuctionStakeService,
    private readonly auctionStakesMapper: AuctionStakesMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create stake on auction for specific user',
  })
  @ApiOkResponse({
    type: AuctionStakeResponse,
  })
  @UseGuards(JWTGuard)
  @Post('/auctionItems/:auctionId/stakes')
  async create(
    @Param('auctionId', AuctionByIdPipe) auctionId: string,
    @Body() body: CreateAuctionStakeDto,
    @Req() req,
  ): Promise<AuctionStakeResponse> {
    return this.auctionStakeService.create(auctionId, body, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get auction stakes by auction id',
  })
  @ApiOkResponse({
    type: [AuctionStakeWithUserResponse],
  })
  @UseGuards(JWTGuard)
  @Get('/auctionItems/:auctionId/stakes')
  async getAll(@Param('auctionId', AuctionByIdPipe) auctionId: string) {
    const auctionStakes =
      await this.auctionStakeService.getAllByAuctionId(auctionId);
    return this.auctionStakesMapper.getStakes(auctionStakes);
  }
}
