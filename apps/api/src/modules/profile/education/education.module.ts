import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database/database.module';

import { EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}