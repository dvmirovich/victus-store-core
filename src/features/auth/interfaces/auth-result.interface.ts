import { UserEntity } from 'src/features/users/entities/user.entity';

export interface AuthResult {
  user: Partial<UserEntity>;
  accessToken: string;
  refreshToken: string;
}
