/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login/google')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const tokens = await this.authService.signInGoogle(signInDto.token);
      return res.status(HttpStatus.OK).json(tokens);
    } catch (e) {
      return res.status(HttpStatus.FORBIDDEN).end();
    }
  }

  @Post('refresh_token')
  async refreshToken(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const tokens = await this.authService.refreshToken(signInDto.token);
      return res.status(HttpStatus.OK).json(tokens);
    } catch (e) {
      return res.status(HttpStatus.FORBIDDEN).end();
    }
  }
}
