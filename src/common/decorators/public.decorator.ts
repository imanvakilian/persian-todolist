import { applyDecorators, UseGuards } from "@nestjs/common"
import { ApiBearerAuth } from "@nestjs/swagger"
import { AuthGuard } from "src/src/auth/guard/auth.guard"
import { AutoSetDrugGuard } from "src/src/drug/guard/auto-set-drug.guard"
import { autoSetOptionsGuard } from "src/src/options/guard/auto-set-options.guard"
import { autoSetToDoListGuard } from "src/src/todolist/guard/auto-set-todolist"

export function AuthDecorator() {
    return applyDecorators(
        ApiBearerAuth("Authorization"),
        UseGuards(AuthGuard)
    )
}

export function AuthAndSetToDoListDecorator() {
    return applyDecorators(
        ApiBearerAuth("Authorization"),
        UseGuards(AuthGuard, autoSetToDoListGuard, autoSetOptionsGuard)
    )
}

export function AuthAndOptionsDecorator() {
    return applyDecorators(
        ApiBearerAuth("Authorization"),
        UseGuards(AuthGuard, autoSetOptionsGuard)
    )
}

export function AuthAndSetDrugDecorator() {
    return applyDecorators(
        ApiBearerAuth("Authorization"),
        UseGuards(AuthGuard, AutoSetDrugGuard)
    )
}