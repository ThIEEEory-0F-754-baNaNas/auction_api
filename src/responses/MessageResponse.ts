import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  chatId: string;
}
