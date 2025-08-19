import { UserRole } from 'src/features/users/enums/user-role.enum';

export interface JWTPayload {
  sub: string;
  phone: string;
  role: UserRole;
}
