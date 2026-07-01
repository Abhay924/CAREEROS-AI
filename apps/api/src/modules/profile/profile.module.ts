import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [DatabaseModule, EducationModule, ExperienceModule],

  controllers: [ProfileController],

  providers: [ProfileService],

  exports: [ProfileService],
})
export class ProfileModule {}