import { BadRequestException, Inject, Injectable, InternalServerErrorException, Scope, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { UserService } from '../../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from '../../user/entities/otp.entity';
import { Repository } from 'typeorm';
import { generateOtp } from 'src/common/utils/functions.util';
import { UserEntity } from '../../user/entities/user.entity';
import { Request, Response } from 'express';
import { TokenService } from './token.service';
import { BadRequestMessage, PublicMessage, UnauthorizedMessage } from 'src/common/messages/public.message';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @Inject(REQUEST) private req: Request,
    ) { }

    async register(registerDto: RegisterDto, res: Response) {
        const user = await this.userService.create(registerDto);
        const otp = await this.createOtp(user.id);
        user.otpId = otp.id;
        await this.userRepository.save(user);
        const token = this.tokenService.generateRegisterToken({ userId: user.id });
        const { COOKIE_NAME_REGISTER } = process.env;
        res.cookie(COOKIE_NAME_REGISTER, token, { maxAge: 1000 * 60 * 2 });
        return res.json({
            message: PublicMessage.otpSent,
            code: otp.code,
        })

    }

    async login(mobile: string, res: Response) {
        const user = await this.userService.findOneByMobile(mobile);
        user.isVervify = false;
        await this.userRepository.save(user);
        const otp = await this.remakeOtp(user.id);
        const token = this.tokenService.generateRegisterToken({ userId: user.id });
        const { COOKIE_NAME_REGISTER } = process.env;
        res.cookie(COOKIE_NAME_REGISTER, token, { maxAge: 1000 * 60 * 2 });
        return res.json({
            message: PublicMessage.otpSent,
            code: otp.code,
        })

    }

    async checkAuth(code: string) {
        const { COOKIE_NAME_REGISTER } = process.env;
        const token = this.req?.cookies?.[COOKIE_NAME_REGISTER];
        if (!token) throw new UnauthorizedException(UnauthorizedMessage.otpExpired);
        const { userId } = this.tokenService.verifyRegisterToken(token);
        const user = await this.userService.findOne(userId);
        const otp = await this.findOneOtp(userId);
        const now = new Date();
        if (otp.expires_in < now || otp.code !== code) throw new UnauthorizedException(UnauthorizedMessage.invalidOtp);
        await this.userRepository.update({ id: user.id }, { isVervify: true })
        const accessToken = this.tokenService.generateAccessToken({ userId });
        return {
            message: PublicMessage.LoggedIn,
            accessToken,
        }
    }

    createOtp(userId: number) {
        const { code, expires_in } = generateOtp()
        const otp = this.otpRepository.create({ userId, code, expires_in });
        return this.otpRepository.save(otp);
    }

    async remakeOtp(userId: number) {
        const otp = await this.findOneOtp(userId);
        const now = new Date();
        if (otp.expires_in > now) throw new BadRequestException(BadRequestMessage.otpTiming);
        const { code, expires_in } = generateOtp();
        otp.code = code;
        otp.expires_in = expires_in;
        return this.otpRepository.save(otp);
    }

    async findOneOtp(userId: number) {
        const otp = await this.otpRepository.findOneBy({ userId });
        if (!otp) throw new InternalServerErrorException(PublicMessage.internalError);
        return otp;
    }

    async validateAuth(token: string) {
        const { userId } = this.tokenService.verifyAccessToken(token);
        const user = await this.userService.findOne(userId);
        if (!user.isVervify) throw new UnauthorizedException(UnauthorizedMessage.loginAgain);
        return user;

    }
}
