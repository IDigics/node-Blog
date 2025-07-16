import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { Vote } from './vote.entity';

import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
    UsersModule,
    PostsModule,
  ],
  providers: [VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
