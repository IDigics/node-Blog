import { Controller, Post, Param, Body, Session, UseGuards, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { VotesService } from './votes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Controller('votes')
export class VotesController {
  constructor(
    private votesService: VotesService,
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Post(':postId')
  @UseGuards(AuthGuard)
  async vote(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('value') value: number,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.usersService.findById(session.userId);
    const post = await this.postsService.findById(postId);

    if (!post) throw new NotFoundException('Post not found');

    return this.votesService.vote(user, post, value);
  }
}
