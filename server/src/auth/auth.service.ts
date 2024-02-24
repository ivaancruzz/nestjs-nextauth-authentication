import { OAuth2Client } from 'google-auth-library';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenError } from 'src/errors/errors';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signInGoogle(tokenProvider: string) {
    try {
      const res = await this.verifyTokenProvider(tokenProvider);
      let payload: any = res.getPayload();

      //Define your payload to send to the client...
      payload = {
        email: payload.email,
        picture: payload.picture,
        name: payload.name,
      };
      const tokens = await this.generateToken(payload);
      return tokens;
    } catch (e) {
      throw new TokenError('Token could not be generated');
    }
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      });
      delete payload.exp;
      const tokens = await this.generateToken(payload);
      return tokens;
    } catch (e: any) {
      throw e;
    }
  }

  private async verifyTokenProvider(token: string) {
    try {
      const client = new OAuth2Client();
      const res = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return res;
    } catch (e) {
      throw e;
    }
  }

  private async generateToken(payload: any) {
    try {
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: 86400, //24h
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: 604800, //7d
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
      };
    } catch (e) {
      throw e;
    }
  }
}
