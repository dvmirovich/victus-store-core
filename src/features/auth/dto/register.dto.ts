import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @Matches(/^996\d{9}$/, {
    message: 'Неправильный формат номера телефона.',
  })
  phone: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'Пароль должен быть более 6 символов и содержать буквы и цифры.',
  })
  @MinLength(6, {
    message: 'Пароль должен быть не менее 6 символов.',
  })
  @MaxLength(20, {
    message: 'Пароль должен быть не более 20 символов.',
  })
  password: string;

  @IsString()
  @MinLength(2, {
    message: 'Минимальная длина имени - 2 символа',
  })
  @MaxLength(50, {
    message: 'Максимальная длина имени - 50 символов',
  })
  firstName: string;

  @IsString()
  @MinLength(2, {
    message: 'Минимальная длина фамилии - 2 символа',
  })
  @MaxLength(50, {
    message: 'Максимальная длина фамилии - 50 символов',
  })
  lastName: string;
}
