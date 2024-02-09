import { IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class RemoveImagesDTO {
  @IsArray()
  @IsNotEmpty()
  @IsUrl({}, { each: true })
  photos: string[];
}
