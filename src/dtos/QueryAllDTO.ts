import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAllDTO {
  @ApiPropertyOptional({
    description: 'Number of the page',
  })
  @IsNumberString(
    {},
    {
      message: 'Page must be a number',
    },
  )
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'Amount of the elements in the page',
  })
  @IsNumberString(
    {},
    {
      message: 'PageSize must be a number',
    },
  )
  @IsOptional()
  pageSize?: number;

  @ApiPropertyOptional({
    description: 'Symbols that should be in a filter',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Sorting parameter',
  })
  sort?: string;

  @ApiPropertyOptional({
    description: 'Sorting order',
    enum: ['asc', 'desc'],
  })
  @IsIn(['asc', 'desc'], { message: 'Wrong value for order' })
  @IsOptional()
  order?: 'asc' | 'desc';
}

export class SortDTO {
  sort?: string;
  order?: 'asc' | 'desc';
}
