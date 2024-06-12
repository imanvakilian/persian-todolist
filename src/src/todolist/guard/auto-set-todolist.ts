import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Observable } from "rxjs";
import { TodolistService } from "../todolist.service";
import { Request } from "express";
import { PublicMessage } from "src/common/messages/public.message";

@Injectable()
export class autoSetToDoListGuard implements CanActivate {
    constructor(private todolistService: TodolistService) { }
    async canActivate(context: ExecutionContext) {
        try {
            const req = context.switchToHttp().getRequest<Request>();
            const { today } = req;
            const { id } = req.user;
            let todolist = await this.todolistService.findOneByDateResolver(today, id);
            req.todolistId = todolist.id;
            return true
        } catch (error) {
            console.log(error);

            throw new InternalServerErrorException(PublicMessage.internalError);
        }
    }
}