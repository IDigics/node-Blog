import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { User } from 'src/users/user.entity';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepo: Repository<Vote>,
  ) {}

  async vote(user: User, post: Post, value: number): Promise<Vote | void> {
    if (!user || !post) {
      throw new Error('User and post are required');
    }

    const existing = await this.voteRepo.findOne({
      where: { user: { id: user.id }, post: { id: post.id } },
    });

    if (existing) {
      if (existing.value === value) {
        await this.voteRepo.remove(existing);
        return;
      } else {
        existing.value = value;
        return this.voteRepo.save(existing);
      }
    }

    const newVote = this.voteRepo.create({ user, post, value });
    return this.voteRepo.save(newVote);
  }
}
