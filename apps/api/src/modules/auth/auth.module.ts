import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret:
        process.env.JWT_SECRET ??
        'CareerOS_AI_Super_Secret_Key_2026',

      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],

  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}