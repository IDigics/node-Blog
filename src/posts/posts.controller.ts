import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Public
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.postsService.findById(id);
  }

  // Admin-only
  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  create(@Body() body) {
    return this.postsService.create(body);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.postsService.update(id, body);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
