import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  password: string;
}
