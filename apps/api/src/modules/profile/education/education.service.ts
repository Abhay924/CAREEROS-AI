import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma/prisma.service';

import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateEducationDto,
  ) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    const education = await this.prisma.education.create({
      data: {
        ...dto,
        profileId: profile.id,
      },
    });

    return {
      success: true,
      message: 'Education added successfully',
      education,
    };
  }

  async findAll(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    const educations = await this.prisma.education.findMany({
      where: {
        profileId: profile.id,
      },
      orderBy: {
        startYear: 'desc',
      },
    });

    return {
      success: true,
      educations,
    };
  }

  async update(
    id: string,
    dto: UpdateEducationDto,
  ) {
    const education = await this.prisma.education.update({
      where: {
        id,
      },
      data: dto,
    });

    return {
      success: true,
      message: 'Education updated successfully',
      education,
    };
  }

  async remove(id: string) {
    await this.prisma.education.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: 'Education deleted successfully',
    };
  }
}