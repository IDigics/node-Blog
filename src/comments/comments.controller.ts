import {Controller,Get,Post,Delete,Param,Body,Session,UseGuards, NotFoundException} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CommentsService } from './comments.service';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private commentsService: CommentsService,
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Get(':postId')
  async getComments(@Param('postId') postId: string) {
    return this.commentsService.getByPost(+postId);
  }

  @Post(':postId')
  @UseGuards(AuthGuard)
  async createComment(
    @Param('postId') postId: string,
    @Body('content') content: string,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.usersService.findById(session.userId);
    const post = await this.postsService.findById(+postId);
    if (!post) {
    throw new NotFoundException('Post not found');
  }
    return this.commentsService.addComment(user, post, content);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.usersService.findById(session.userId);
    return this.commentsService.deleteComment(+id, user);
  }
}
