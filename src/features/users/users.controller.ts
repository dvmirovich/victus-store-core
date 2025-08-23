import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoles } from './enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('all')
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById;
  }

  @Get('block/:id')
  @Roles(UserRoles.ADMIN)
  async block(@Param('id') id: number) {
    return this.userService.block(id);
  }

  @Get('unblock/:id')
  @Roles(UserRoles.ADMIN)
  async unblock(@Param('id') id: number) {
    return this.userService.unblock(id);
  }
}
