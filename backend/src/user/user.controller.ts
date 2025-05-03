import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import removeProperties from 'src/utils/removeProperties';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    const usersWithoutPasswords = users.map((user) =>
      removeProperties(user, 'password'),
    );
    return usersWithoutPasswords;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({ id });
    return removeProperties(user, 'password');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove({ id });
  }
}
