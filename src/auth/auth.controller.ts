import { Controller, Post, Body, Request, Response, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { LoginDto } from './dto/auth.dto';
import { loginResDto } from './dto/auth_res.dto';

// jwt
import { AuthGuard } from '@nestjs/passport';

@ApiTags('登录相关')
@ApiResponse({ status: 200, description: 'OK' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@ApiResponse({ status: 404, description: 'Not Found' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  private readonly logger = new Logger(AuthController.name);

  // 用户登录
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  // @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: loginResDto })
  login(@Request() req, @Body() body) {
    return this.authService.login(req, body);
  }
}
