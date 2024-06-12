import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMilitaryTime, IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class CreateDrugDto {
    @ApiProperty()
    @IsString()
    @Length(1, 30)
    name: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Length(1, 100)
    description: string;
    @ApiProperty()
    @IsNumberString()
    @Length(0.25, 3)
    length: number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsMilitaryTime()
    time: string;
}
