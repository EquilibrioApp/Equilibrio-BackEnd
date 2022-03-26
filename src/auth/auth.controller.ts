import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Get('login')
  async login(@Body() body:AuthDto): Promise<AuthResponseDto> {
    return this.authService.validateUser(body.email, body.password);
  }

  @Get('logout')
  async logout(@Body() body:AuthDto): Promise<AuthResponseDto> {
    return this.authService.validateUser(body.email, body.password);
  }
}