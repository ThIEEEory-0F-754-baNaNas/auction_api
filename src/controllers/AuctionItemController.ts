import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAuctionItemDTO } from '../dtos/CreateAuctionItemDTO';
import { JWTGuard } from '../guards/JWTGuard';
import { AuctionItemService } from '../services/AuctionItemService';
import { AuctionByIdPipe } from '../pipes/AuctionByIdPipe';
import { UpdateAuctionItemDTO } from '../dtos/UpdateAuctionItemDTO';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuctionItemResponse } from '../responses/AuctionItemResponse';
import { QueryAllAuctionItemsDTO } from '../dtos/QueryAllAuctionItemsDTO';

@ApiTags('AuctionItem')
@Controller('/auctionItems')
export class AuctionItemController {
  constructor(private auctionItemService: AuctionItemService) {}

  @ApiOperation({
    summary: 'Get all auctions',
  })
  @ApiOkResponse({
    type: [AuctionItemResponse],
  })
  @Get()
  async getAll(@Query() query: QueryAllAuctionItemsDTO) {
    return this.auctionItemService.getAll(query);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create auction',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @Post()
  async create(
    @Body() body: CreateAuctionItemDTO,
    @Req() req,
  ): Promise<AuctionItemResponse> {
    return this.auctionItemService.create(body, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get auction by id',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @Get('/:auctionId')
  async get(
    @Param('auctionId', AuctionByIdPipe) auctionId: string,
  ): Promise<AuctionItemResponse> {
    return this.auctionItemService.getById(auctionId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update auction',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @Patch('/:auctionId')
  async update(
    @Param('auctionId', AuctionByIdPipe) auctionId: string,
    @Body() body: UpdateAuctionItemDTO,
  ): Promise<AuctionItemResponse> {
    return this.auctionItemService.update(auctionId, body);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete auction by id',
  })
  @ApiOkResponse({
    type: AuctionItemResponse,
  })
  @UseGuards(JWTGuard)
  @Delete('/:auctionId')
  async delete(@Param('auctionId', AuctionByIdPipe) auctionId: string) {
    return this.auctionItemService.delete(auctionId);
  }
}
