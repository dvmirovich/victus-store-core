import { IsNumber, IsString, MinLength } from 'class-validator';
import { BrandEntity } from 'src/database/entities/brand.entity';
import { CategoryEntity } from 'src/database/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @MinLength(1, { message: 'Название продукта не может быть пустым' })
  name: string;

  @IsString()
  @MinLength(5, { message: 'Описание должно состоять миним из 5 символов' })
  description: string;

  @IsNumber()
  oldPrice: number;

  @IsNumber()
  price: number;

  brand: BrandEntity;
  category: CategoryEntity;
}
