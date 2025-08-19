import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  password?: string;

  @IsBoolean()
  isActive?: boolean;

  @IsString()
  refreshToken?: string | null;
}
