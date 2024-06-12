import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { Observable } from "rxjs";
import { UnauthorizedMessage } from "src/common/messages/public.message";
import { AuthService } from "../services/auth.service";
import * as jalaliMoment from"jalali-moment";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        const authorization = req?.headers?.authorization;
        if (!authorization) throw new UnauthorizedException(UnauthorizedMessage.loginAgain);
        const [bearer, token] = authorization.split(" ");
        if (bearer.toLocaleLowerCase() !== "bearer" || !isJWT(token)) throw new UnauthorizedException(UnauthorizedMessage.loginAgain);
        const user = await this.authService.validateAuth(token);
        const today = jalaliMoment().locale("fa").format("jYYYY/jMM/jDD");
        req.today = today;
        req.user = user;
        return true;
    }
}