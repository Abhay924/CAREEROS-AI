import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { EducationModule } from './education/education.module';

@Module({
  imports: [DatabaseModule, EducationModule],

  controllers: [ProfileController],

  providers: [ProfileService],

  exports: [ProfileService],
})
export class ProfileModule {}