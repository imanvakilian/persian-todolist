import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { DrugService } from "../drug.service";

@Injectable()
export class AutoSetDrugGuard implements CanActivate {
    constructor(private drugService: DrugService) {}
    async canActivate(context: ExecutionContext){
        await this.drugService.autoSetDrug()
        return true;
    }
}