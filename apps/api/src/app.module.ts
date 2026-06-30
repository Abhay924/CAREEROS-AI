import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ResumesModule } from './modules/resumes/resumes.module';
import { InterviewsModule } from './modules/interviews/interviews.module';
import { SalaryModule } from './modules/salary/salary.module';
import { LearningModule } from './modules/learning/learning.module';
import { TrackerModule } from './modules/tracker/tracker.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [AuthModule, UsersModule, JobsModule, CompaniesModule, ResumesModule, InterviewsModule, SalaryModule, LearningModule, TrackerModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
