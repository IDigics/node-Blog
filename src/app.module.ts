import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';

import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Vote } from './votes/vote.entity';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Post, Comment, Vote],
  synchronize: true,
}),
AuthModule, 
UsersModule, 
PostsModule, 
CommentsModule, 
VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
