import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Tpayload } from "../types/auth.type";
import { PublicMessage, UnauthorizedMessage } from "src/common/messages/public.message";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) { }
    generateRegisterToken(payload: Tpayload) {
        try {
            const secret = process.env.JWT_REGISTER_SECRET;
            return this.jwtService.sign(payload, { secret, expiresIn: 1000 * 60 * 2 });
        } catch (error) {
            throw new InternalServerErrorException(PublicMessage.internalError)
        }
    }
    generateAccessToken(payload: Tpayload) {
        try {
            const secret = process.env.JWT_ACCESS_SECRET;
            return this.jwtService.sign(payload, { secret, expiresIn: "90d" });
        } catch (error) {
            throw new InternalServerErrorException(PublicMessage.internalError)
        }
    }
    verifyRegisterToken(token: string) {
        try {
            const secret = process.env.JWT_REGISTER_SECRET;
            return this.jwtService.verify(token, { secret });
        } catch (error) {
            throw new UnauthorizedException(UnauthorizedMessage.otpExpired);
        }
    }
    verifyAccessToken(token: string) {
        try {
            const secret = process.env.JWT_ACCESS_SECRET;
            return this.jwtService.verify(token, { secret });
        } catch (error) {
            throw new UnauthorizedException(UnauthorizedMessage.loginAgain);
        }
    }
}