import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(1, { message: 'Имя не должно быть пустым' })
  name: string;

  @IsString()
  @MinLength(5, { message: 'Описание должно быть минимум 5 символов' })
  description: string;
}
