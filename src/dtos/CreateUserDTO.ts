import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  @IsString()
  avatar?: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  password: string;
}
