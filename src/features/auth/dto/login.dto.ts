import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @Matches(/^996\d{9}$/, {
    message: 'Неправильный формат номера телефона.',
  })
  phoneNumber: string;

  @IsString()
  @MinLength(1, { message: 'Пароль не должен быть пустым' })
  password: string;
}
