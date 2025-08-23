import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { EUserRoles } from '../../infrastructure/enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('all')
  @Roles(EUserRoles.ADMIN, EUserRoles.MANAGER)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.MANAGER)
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById;
  }

  @Get(':number')
  @Roles(EUserRoles.ADMIN, EUserRoles.MANAGER)
  async findOneByNumber(@Param('number') phoneNumber: string) {
    return this.userService.findOneByNumber(phoneNumber);
  }

  @Get('block/:id')
  @Roles(EUserRoles.ADMIN)
  async block(@Param('id') id: number) {
    return this.userService.block(id);
  }

  @Get('unblock/:id')
  @Roles(EUserRoles.ADMIN)
  async unblock(@Param('id') id: number) {
    return this.userService.unblock(id);
  }
}
