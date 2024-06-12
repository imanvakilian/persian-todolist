import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { OptionsService } from "../options.service";

@Injectable()
export class autoSetOptionsGuard implements CanActivate {
    constructor (private optionsService: OptionsService) {}
    async canActivate(context: ExecutionContext) {
        await this.optionsService.autoSetOptions();
        return true;
    }
}