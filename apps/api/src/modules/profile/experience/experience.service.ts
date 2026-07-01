import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma/prisma.service';

import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateExperienceDto,
  ) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const experience = await this.prisma.experience.create({
      data: {
        company: dto.company,
        position: dto.position,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        profileId: profile.id,
      },
    });

    return {
      success: true,
      message: 'Experience added successfully',
      experience,
    };
  }

  async findAll(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const experiences = await this.prisma.experience.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return {
      success: true,
      experiences,
    };
  }

  async update(
    id: string,
    dto: UpdateExperienceDto,
  ) {
    const experience = await this.prisma.experience.update({
      where: {
        id,
      },
      data: {
        company: dto.company,
        position: dto.position,
        description: dto.description,
        startDate: dto.startDate
          ? new Date(dto.startDate)
          : undefined,
        endDate: dto.endDate
          ? new Date(dto.endDate)
          : undefined,
      },
    });

    return {
      success: true,
      message: 'Experience updated successfully',
      experience,
    };
  }

  async remove(id: string) {
    await this.prisma.experience.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: 'Experience deleted successfully',
    };
  }
}