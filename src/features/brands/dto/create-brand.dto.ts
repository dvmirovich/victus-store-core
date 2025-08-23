import { IsString, IsUrl } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  logoUrl: string;
}
