import { UserRole } from 'src/features/users/enums/user-role.enum';

export interface JWTPayload {
  sub: number;
  phone: string;
  role: UserRole;
}
