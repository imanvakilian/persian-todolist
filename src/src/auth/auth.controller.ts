import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerApiConsumes, swaggerApiTags } from 'src/common/enums/swagger.enum';
import { CheckAuthDto, LoginDto, RegisterDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags(swaggerApiTags.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/register")
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    return this.authService.register(registerDto, res);
  }
  @Post("/login")
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.login(loginDto.mobile, res);
  }
  @Post("/")
  @ApiConsumes(swaggerApiConsumes.urlEncoded)
  checkAuth(@Body() checkAuthDto: CheckAuthDto) {
    return this.authService.checkAuth(checkAuthDto.code);
  }
}
