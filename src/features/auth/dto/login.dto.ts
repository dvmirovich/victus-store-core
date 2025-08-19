import { IsEmail, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @Matches(/^996\d{9}$/, {
    message: 'Неправильный формат номера телефона.',
  })
  phoneNumber: string;

  @IsString()
  password: string;
}
