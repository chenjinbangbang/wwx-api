import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// 加密crypto
// import crypto = require('crypto');

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // 验证用户，返回用户信息
  async validate(openid: string): Promise<any> {
    console.log('验证用户，返回用户信息')

    // 加密crypto
    // const hash = crypto.createHmac('sha256', password).update('hot').digest('hex');

    const user = await this.authService.validateUser(openid);
    if (!user) {
      throw new UnauthorizedException({ message: '登录失败，请重新进入' });
    }
    return user;
  }
}