import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string; 

  @Column('text')
  content: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User)
  user: User; 
}
