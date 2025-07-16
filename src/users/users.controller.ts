import {Controller,Get,Param,Delete,Patch,Body,Session,UseGuards,} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard'; // You’ll create this
import { AdminGuard } from 'src/auth/admin.guard'; // You’ll create this

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
  getUser(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  updateUser(@Param('id') id: string, @Body() body: Partial<{ email: string; password: string }>) {
    return this.usersService.update(+id, body);
  }
}
