// auth/strategies/jwt.strategy.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { JWTPayload } from '../interfaces/jwt-payload.interface';

export interface JwtPayload {
  sub: number; // ID как число
  phone: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    const logger = new Logger(JwtStrategy.name);
    const jwtSecret = configService.get<string>('JWT_SECRET');

    logger.debug(jwtSecret);

    if (!jwtSecret || typeof jwtSecret !== 'string') {
      throw new Error(
        `JWT_SECRET must be a non-empty string. Got: ${typeof jwtSecret}`,
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });

    console.log('✅ JWT_SECRET loaded successfully');
  }

  async validate(payload: JWTPayload) {
    try {
      const user = await this.authService.validateUser(payload);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      console.error('JWT validation error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
