import { IsObject } from 'class-validator';
import { UserEntity } from 'src/database/entities/user.entity';

export class CreateShoppingCartDto {
  user: UserEntity;
}
