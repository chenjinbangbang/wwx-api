import { Controller, Logger, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { pvDto } from './dto/user_pv.dto';
import { pvResDto } from './dto/user_pv_res.dto';
import { responseDto } from 'src/common/dto';

@ApiTags('用户相关')
@ApiResponse({ status: 200, description: 'OK' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@ApiResponse({ status: 404, description: 'Not Found' })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  private readonly logger = new Logger(UserController.name);

  // 记录官网用户PV
  @Post('pv')
  @ApiOperation({ summary: '记录官网用户PV' })
  @ApiBody({ type: pvDto })
  @ApiResponse({ status: 200, type: responseDto })
  setUserPv(@Body() body) { 
    return this.userService.setUserPv(body);
  }

  // 获取官网用户PV值
  @Get('pi/info')
  @ApiOperation({ summary: '获取官网用户PV值' })
  @ApiResponse({ status: 200, type: pvResDto })
  getUserPv() { 
    return this.userService.getUserPv();
  }


}
