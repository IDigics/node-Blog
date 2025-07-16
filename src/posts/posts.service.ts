import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { ImageService } from 'src/images/images.service';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class PostsService {
  private uploadFolder = process.env.UPLOAD_FOLDER || 'uploads';

  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private imageService: ImageService,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: ['user'] }); 
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(
    postData: Partial<Post>,
    file?: Express.Multer.File, 
  ): Promise<Post> {
    if (file) {
      const filename = await this.imageService.processAndSaveImage(file);
      postData.image = filename;
    }
    const post = this.postRepo.create(postData);
    return this.postRepo.save(post);
  }

  async update(
    id: number,
    updateData: Partial<Post>,
    file?: Express.Multer.File,
  ): Promise<Post> {
    const post = await this.findById(id);

    if (file) {
      if (post.image) {
        const oldImagePath = path.join(this.uploadFolder, post.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.warn('Failed to delete old image:', err.message);
        }
      }
      const filename = await this.imageService.processAndSaveImage(file);
      updateData.image = filename;
    }

    await this.postRepo.update(id, updateData);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findById(id);

    if (post.image) {
      const imagePath = path.join(this.uploadFolder, post.image);
      try {
        await fs.unlink(imagePath);
        console.log(`Deleted image file: ${imagePath}`);
      } catch (err) {
        console.warn(`Failed to delete image file: ${imagePath}`, err.message);
      }
    }

    await this.postRepo.remove(post);
  }
}
