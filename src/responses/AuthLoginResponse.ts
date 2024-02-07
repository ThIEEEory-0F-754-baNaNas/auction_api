import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponse {
  @ApiProperty()
  token: string;
}
