import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  findAll() {
    return this.postRepo.find({ relations: ['author'] });
  }

  findById(id: number) {
    return this.postRepo.findOne({ where: { id } });
  }

  create(postData: Partial<Post>) {
    const post = this.postRepo.create(postData);
    return this.postRepo.save(post);
  }

  update(id: number, updateData: Partial<Post>) {
    return this.postRepo.update(id, updateData);
  }

  async remove(id: number) {
    const post = await this.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return this.postRepo.remove(post);
  }
}
