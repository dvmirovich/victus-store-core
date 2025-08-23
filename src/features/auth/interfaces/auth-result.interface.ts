import { UserEntity } from 'src/infrastructure/database/entities/user.entity';

export interface AuthResult {
  user: Partial<UserEntity>;
  accessToken: string;
  refreshToken: string;
}
