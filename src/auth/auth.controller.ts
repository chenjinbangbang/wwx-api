import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('登录相关')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 登录
  @Post('login')
  @ApiOperation({ summary: '登录接口' })
  login() {
    return this.authService.login();
  }
}
