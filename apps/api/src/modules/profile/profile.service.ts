import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        educations: true,
        experiences: true,
        skills: true,
        projects: true,
        certificates: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return {
      success: true,
      profile,
    };
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ) {
    const profile = await this.prisma.profile.update({
      where: {
        userId,
      },
      data: dto,
    });

    return {
      success: true,
      message: 'Profile updated successfully',
      profile,
    };
  }
}