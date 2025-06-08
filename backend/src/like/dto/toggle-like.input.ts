import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ToggleLikeInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;
}
