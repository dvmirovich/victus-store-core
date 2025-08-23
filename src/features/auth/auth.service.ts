import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { AuthResult } from './interfaces/auth-result.interface';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/database/entities/user.entity';
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResult> {
    const existingUser = await this.userService.findOneByNumber(
      registerDto.phoneNumber,
    );
    this.logger.log(`Проверка ${JSON.stringify(registerDto, null, 2)}`);
    this.logger.log(`Проверка ${JSON.stringify(existingUser, null, 2)}`);

    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким телефоном уже существует',
      );
    }

    const savedUser = await this.userService.register(registerDto);

    const tokens = await this.generateTokens(savedUser);

    await this.updateRefreshToken(savedUser.id, tokens.refreshToken);

    return {
      user: this.sanitizeUser(savedUser),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResult> {
    const user = await this.userService.findOneByNumber(loginDto.phoneNumber);

    if (!user || !(await user.validatePassword(loginDto.password))) {
      throw new UnauthorizedException('Неверный телефон или пароль');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Аккаунт заблокирован');
    }

    const tokens = await this.generateTokens(user);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refreshTokens(refreshToken: string): Promise<AuthResult> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findOneById(payload.sub);

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Недействительный refresh token');
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Недействительный refresh token');
      }

      const tokens = await this.generateTokens(user);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Недействительный refresh token');
    }
  }

  async logout(userId: number): Promise<void> {
    await this.userService.update(userId, { refreshToken: null });
  }

  async validateUser(payload: JWTPayload): Promise<UserEntity> {
    const user = await this.userService.findOneById(payload.sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private async generateTokens(user: UserEntity) {
    const payload: JWTPayload = {
      sub: user.id,
      phone: user.phoneNumber,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '15m' }),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  private sanitizeUser(user: UserEntity): Partial<UserEntity> {
    const { password, refreshToken, ...sanitized } = user;
    return sanitized;
  }
}
