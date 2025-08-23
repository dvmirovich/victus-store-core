import { UserEntity } from 'src/infrastructure/database/entities/user.entity';
import { EOrderStatus } from '../../../infrastructure/enums/order.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  user: UserEntity;

  @IsEnum(EOrderStatus)
  status: EOrderStatus;

  @IsNumber()
  totalPrice: number;

  @IsString()
  shippingAddress: string;
}
