import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNumberString, IsString, Length } from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @Length(3, 50)
    firstname: string;
    @ApiProperty()
    @IsString()
    @Length(3, 50)
    lastname: string;
    @ApiProperty()
    @IsMobilePhone("fa-IR")
    mobile: string;
}
export class LoginDto {
    @ApiProperty()
    @IsMobilePhone("fa-IR")
    mobile: string;
}
export class CheckAuthDto {
    @ApiProperty()
    @IsNumberString()
    @Length(4, 4)
    code: string;
}