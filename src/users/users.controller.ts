import { Controller, Get, Param, Delete, Patch, Body, Session, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@Session() session: Record<string, any>) {
    return this.usersService.findById(session.userId);
  }

  @Get()
  @UseGuards(AdminGuard)
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{ email: string; password: string }>,
  ) {
    return this.usersService.update(id, body);
  }
 @Patch(':id/make-admin')
 //@UseGuards(AdminGuard)
async makeAdmin(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.update(id, { isAdmin: true });
}
}
