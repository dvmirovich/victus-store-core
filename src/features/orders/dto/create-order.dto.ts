import { UserEntity } from 'src/database/entities/user.entity';
import { OrderStatus } from '../enums/order.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  user: UserEntity;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  totalPrice: number;

  @IsString()
  shippingAddress: string;
}
