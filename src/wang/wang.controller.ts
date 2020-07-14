import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { WangService } from './wang.service';
import { resFormat } from 'src/common/global';

@ApiTags('王者荣耀接口')
@Controller('wang')
export class WangController {
  constructor(private readonly wangService: WangService) { }

  // 获取王者荣耀题目列表
  @Get('request/list')
  @ApiOperation({ summary: '获取王者荣耀题目列表' })
  @ApiQuery({ name: 'question', description: '题目编号' })
  // @ApiQuery({ name: 'openid', description: 'openid' })
  getQuestionList(@Request() req, @Query() query) {
    console.log('list ', req.headers)
    if (req.headers.authorization !== req.session.access_token) {
      return resFormat(false, null, '您还未登录或登录已过期，请重新登录')
    }
    return this.wangService.getQuestionList(query);
  }
}
