import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/users/user.entity';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepo: Repository<Comment>,
  ) {}

  async getByPost(postId: number): Promise<Comment[]> {
    return this.commentsRepo.find({
      where: { post: { id: postId } },
      relations: ['user'],  // confirm 'user' is correct in your entity
      order: { createdAt: 'DESC' },
    });
  }

  async addComment(user: User, post: Post, content: string): Promise<Comment> {
    const comment = this.commentsRepo.create({ content, user, post });
    return this.commentsRepo.save(comment);
  }

  async deleteComment(commentId: number, currentUser: User): Promise<void> {
    const comment = await this.commentsRepo.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    if (!comment) throw new NotFoundException('Comment not found');

    const isOwner = comment.user.id === currentUser.id;
    const isAdmin = currentUser.isAdmin;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not allowed to delete this comment');
    }

    await this.commentsRepo.remove(comment);
  }
}
