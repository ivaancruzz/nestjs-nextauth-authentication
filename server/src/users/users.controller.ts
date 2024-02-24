import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  @Get('profile')
  async getProfile(@Res() res: Response, @Req() req: any) {
    return res.status(HttpStatus.OK).json({ ...req.user });
  }
}
