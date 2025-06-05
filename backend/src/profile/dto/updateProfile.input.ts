import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  displayName?: string;

  @Field({ nullable: true })
  @IsOptional()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  goal?: string;
}
