import { IsNumber } from 'class-validator';
import { OrderEntity } from 'src/database/entities/order.entity';
import { ProductEntity } from 'src/database/entities/product.entity';

export class CreateOrderItemDto {
  order: OrderEntity;

  product: ProductEntity;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
