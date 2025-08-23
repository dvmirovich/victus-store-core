import { IsNumber } from 'class-validator';
import { OrderEntity } from 'src/infrastructure/database/entities/order.entity';
import { ProductEntity } from 'src/infrastructure/database/entities/product.entity';

export class CreateOrderItemDto {
  order: OrderEntity;

  product: ProductEntity;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
