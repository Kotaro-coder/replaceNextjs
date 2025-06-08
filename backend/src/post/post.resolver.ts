import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.models';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Post as PrismaPost } from '@prisma/client';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getPost(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<PrismaPost[]> {
    return await this.postService.getPost(userId);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('createPost') CreatePostInput: CreatePostInput,
  ): Promise<PrismaPost> {
    return this.postService.createPost(CreatePostInput);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<PrismaPost> {
    return await this.postService.updatePost(updatePostInput);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PrismaPost> {
    return await this.postService.deletePost(id);
  }
}
