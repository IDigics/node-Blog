import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comment.entity';
import { UsersModule } from 'src/users/users.module';  // import UsersModule
import { PostsModule } from 'src/posts/posts.module';  // import PostsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    UsersModule,
    PostsModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
