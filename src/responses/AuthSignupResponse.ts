import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './UserResponse';

export class AuthSignupResponse extends UserResponse {
  @ApiProperty()
  password: string;
}
