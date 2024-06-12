import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class CreateOptionDto {
    @ApiProperty()
    @IsString()
    @Length(1, 20)
    title: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Length(1, 100)
    description: string;
    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    @Length(1, 20)
    limitation: string;
}