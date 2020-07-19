import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { WangService } from './wang.service';
import { resFormat } from 'src/common/global';
import config from 'src/config';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('王者荣耀接口')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('wang')
export class WangController {
  constructor(private readonly wangService: WangService) { }

  // 获取某个王者荣耀题目
  @Get('request/list')
  @ApiOperation({ summary: '获取某个王者荣耀题目' })
  @ApiQuery({ name: 'question', description: '题目编号' })
  getQuestionList(@Query() query) {
    return this.wangService.getQuestionList(query);
  }
}
