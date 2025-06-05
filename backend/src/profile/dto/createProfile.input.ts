import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNotEmpty()
  displayName: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  goal?: string;

  @Field(() => Int)
  userId: number;
}
