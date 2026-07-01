import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ProfileService } from './profile.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  getProfile(
    @CurrentUser() user: JwtPayload,
  ) {
    return this.profileService.getProfile(user.sub);
  }

  @Put()
  updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(
      user.sub,
      dto,
    );
  }
}