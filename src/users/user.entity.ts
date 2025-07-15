import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from 'src/posts/post.entity';
import { Comment } from 'src/comments/comment.entity';
import { Vote } from 'src/votes/vote.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // hashed

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];
}
