import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMilitaryTime, IsOptional, IsString, IsTimeZone, Length } from "class-validator";

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    @Length(1, 30)
    title: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(1, 100)
    description: string;
    @ApiPropertyOptional({ description: "00:00 to 23:59" })
    @IsOptional()
    @IsMilitaryTime()
    timeToDo: string;
}

export class UpdateTodoDto {
    @ApiPropertyOptional({ example: "00:00", description: "00:00 to 23:59" })
    @IsOptional()
    @IsMilitaryTime()
    timeToDo: string;
}
