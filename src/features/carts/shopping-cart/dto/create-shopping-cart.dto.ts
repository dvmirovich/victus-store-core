import { IsObject } from 'class-validator';
import { UserEntity } from 'src/infrastructure/database/entities/user.entity';

export class CreateShoppingCartDto {
  user: UserEntity;
}
