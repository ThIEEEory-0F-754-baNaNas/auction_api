import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDTO {
  @IsNotEmpty()
  @IsString()
  text: string;
}
