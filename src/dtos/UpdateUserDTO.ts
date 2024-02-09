import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsString()
  @IsOptional()
  username?: string;
}
