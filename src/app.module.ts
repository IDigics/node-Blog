import { Module,MiddlewareConsumer} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';

import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Comment } from './comments/comment.entity';
import { Vote } from './votes/vote.entity';
import { ImageService } from './images/images.service';

import { IpLoggerMiddleware } from './auth/IpLoggerMiddleware';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DATABASE'),
        entities: [User, Post, Comment, Vote],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(IpLoggerMiddleware)
        .forRoutes('*');
    }
}
