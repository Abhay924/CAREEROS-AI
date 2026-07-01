import {
  Injectable,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        profile: {
          create: {
            fullName: dto.fullName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return {
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
    };
  }
}