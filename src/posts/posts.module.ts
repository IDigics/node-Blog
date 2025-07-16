import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { ImageService } from 'src/images/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService,ImageService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}

