import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/comment.entity';
import { Vote } from 'src/votes/vote.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string; // can hold HTML string

  @Column({ nullable: true })
  imagePath: string; // store filename or URL

  @ManyToOne(() => User, user => user.posts)
  author: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @OneToMany(() => Vote, vote => vote.post)
  votes: Vote[];
}
