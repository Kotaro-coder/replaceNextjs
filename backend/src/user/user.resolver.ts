import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUser.input';
import { User as UserModel } from './models/user.model';
import { User } from '@prisma/client';
import { GetUserArgs } from './dto/getUser.args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') CreateUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(CreateUserInput);
  }

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getUser(@Args() GetUserArgs: GetUserArgs): Promise<User | null> {
    return await this.userService.getUser(GetUserArgs.email);
  }
}
