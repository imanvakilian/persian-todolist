import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../user/entities/otp.entity';
import { TokenService } from './services/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([OtpEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtService],
  exports: [TypeOrmModule, AuthService, TokenService, JwtService],
})
export class AuthModule { }
