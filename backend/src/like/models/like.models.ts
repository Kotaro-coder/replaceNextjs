import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostType } from '@prisma/client';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  postId: number;

  @Field()
  type: PostType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
