import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @IsUrl()
  avatar?: string;

  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  firstname?: string;

  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  lastname?: string;

  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  @IsString()
  username?: string;
}
