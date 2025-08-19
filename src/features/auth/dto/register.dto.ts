import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @Matches(/^996\d{9}$/, {
    message: 'Номер телефона должен начинаться с 996 и содержать 12 цифр',
  })
  phoneNumber: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
  @MaxLength(20, { message: 'Максимальная длина пароля - 20 символов' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Пароль должен содержать минимум одну букву и одну цифру',
  })
  password: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @MinLength(2, { message: 'Минимальная длина имени - 2 символа' })
  @MaxLength(50, { message: 'Максимальная длина имени - 50 символов' })
  firstName: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @MinLength(2, { message: 'Минимальная длина фамилии - 2 символа' })
  @MaxLength(50, { message: 'Максимальная длина фамилии - 50 символов' })
  lastName: string;
}
