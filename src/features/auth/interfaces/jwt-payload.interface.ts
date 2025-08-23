import { EUserRoles } from 'src/infrastructure/enums/user-role.enum';

export interface JWTPayload {
  sub: number;
  phone: string;
  role: EUserRoles;
}
