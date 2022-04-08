import { Controller, Post, UseGuards, Request, Get, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body:AuthDto): Promise<AuthResponseDto> {
    return this.authService.validateUser(body.email, body.password);
  }

  @Get('logout')
  async logout(@Body() body:AuthDto): Promise<AuthResponseDto> {
    return this.authService.validateUser(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/verify/token')//Buscar usuario mediante el Id
  checkToken() {
    return ;
  }
}