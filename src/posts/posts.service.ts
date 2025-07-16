import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  async findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: ['author'] });
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(postData: Partial<Post>): Promise<Post> {
    const post = this.postRepo.create(postData);
    return this.postRepo.save(post);
  }

  async update(id: number, updateData: Partial<Post>): Promise<Post> {
    await this.findById(id);
    await this.postRepo.update(id, updateData);
    return this.findById(id); 
  }

  async remove(id: number): Promise<void> {
    const post = await this.findById(id);
    await this.postRepo.remove(post);
  }
}
