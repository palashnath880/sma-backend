import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dio';
import { Public } from './decorators/public.decorator';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user signup.
   * @param body The request body containing signup details.
   */

  @Public()
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  /**
   * Handles user login.
   * @param body The request body containing login details.
   */
  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Refresh token route
   * @param req
   * @returns
   */
  @Public()
  @Get('/refresh-token')
  async refreshToken(@Req() req: Request) {
    const token = req.headers['authorization']?.split(' ');

    if (!token || !token[1])
      throw new UnauthorizedException('No token provided');

    return this.authService.refreshToken(token[1]);
  }
}
