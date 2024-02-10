import { ApiProperty } from '@nestjs/swagger';

export class ShortUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  username: string;
}

export class UserResponse extends ShortUserResponse {
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;
}
