import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/createProfile.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileInput } from './dto/updateProfile.input';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userId: number): Promise<Profile[]> {
    return this.prismaService.profile.findMany({
      where: { userId },
    });
  }

  async createProfile(createProfileInput: CreateProfileInput): Promise<Profile> {
    const { displayName, bio, goal, userId } = createProfileInput;
    return this.prismaService.profile.create({
      data: {
        displayName,
        bio,
        goal,
        userId,
      },
    });
  }

  async updateProfile(updateProfileInput: UpdateProfileInput): Promise<Profile> {
    const { id, displayName, bio, goal } = updateProfileInput;
    return await this.prismaService.profile.update({
      data: { id, displayName, bio, goal },
      where: { id },
    });
  }
}
