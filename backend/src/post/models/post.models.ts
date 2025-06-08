import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostType } from '@prisma/client';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  type: PostType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
