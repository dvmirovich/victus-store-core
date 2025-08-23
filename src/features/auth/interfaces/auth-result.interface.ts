import { UserEntity } from 'src/database/entities/user.entity';

export interface AuthResult {
  user: Partial<UserEntity>;
  accessToken: string;
  refreshToken: string;
}
