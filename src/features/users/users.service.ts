import { RegisterDto } from './../auth/dto/register.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/database/entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private _crudRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this._crudRepo.find();
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return this._crudRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async findOneByNumber(phoneNumber: string) {
    return this._crudRepo.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
  }

  async register(registerDto: RegisterDto) {
    const user = this._crudRepo.create(registerDto);
    return await this._crudRepo.save(user);
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this._crudRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const updatedUser = Object.assign(user, updateUserDto);
    return this._crudRepo.save(updatedUser);
  }

  async block(id: number): Promise<void> {
    const user = await this._crudRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    this._crudRepo.update(id, { isActive: false });
  }

  async unblock(id: number): Promise<void> {
    const user = await this._crudRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    this._crudRepo.update(id, { isActive: true });
  }
}
