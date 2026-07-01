import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';

import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}