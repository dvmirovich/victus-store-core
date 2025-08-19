import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor() {}
}
