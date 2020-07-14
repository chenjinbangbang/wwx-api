import { Controller, Post, Body, Request } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsString } from 'class-validator';

// 登录实体
class LoginDto {
  @ApiProperty({
    description: '小程序code'
  })
  @IsString()
  readonly code: string;
}

@ApiTags('登录相关')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // 登录
  @Post('login')
  @ApiOperation({ summary: '登录接口' })
  @ApiBody({ type: LoginDto })
  login(@Request() req, @Body() body) {
    return this.authService.login(req, body);
  }
}
