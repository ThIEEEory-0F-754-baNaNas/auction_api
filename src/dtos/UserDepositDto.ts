import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDepositDto {
  @ApiProperty({
    description: 'Amount of money to be deposited',
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
