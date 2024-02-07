import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsUrl()
  avatar?: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  username?: string;
}
