import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './models/profile.model';
import { CreateProfileInput } from './dto/createProfile.input';
import { UpdateProfileInput } from './dto/updateProfile.input';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Profile], { nullable: 'items' })
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Profile[]> {
    return await this.profileService.getProfile(userId);
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<Profile> {
    return this.profileService.createProfile(createProfileInput);
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ): Promise<Profile> {
    return await this.profileService.updateProfile(updateProfileInput);
  }
}
