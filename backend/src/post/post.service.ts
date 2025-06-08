import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/createPost.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostInput } from './dto/updatePost.input';
import { Post as PrismaPost } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPost(userId: number): Promise<PrismaPost[]> {
    return this.prismaService.post.findMany({
      where: { userId },
    });
  }

  async createPost(createPostInput: CreatePostInput): Promise<PrismaPost> {
    const { description, type, userId } = createPostInput;
    return await this.prismaService.post.create({
      data: {
        description,
        type,
        userId,
      },
    });
  }

  async updatePost(updatePostInput: UpdatePostInput): Promise<PrismaPost> {
    const { id, description, type } = updatePostInput;
    return await this.prismaService.post.update({
      data: { id, description, type },
      where: { id },
    });
  }

  async deletePost(id: number): Promise<PrismaPost> {
    return await this.prismaService.post.delete({
      where: { id },
    });
  }
}
