import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Post } from 'src/posts/post.entity';

@Entity()
@Unique(['user', 'post']) // one vote per user per post
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number; // 1 or -1

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => Post, post => post.votes)
  post: Post;
}
