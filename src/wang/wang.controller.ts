import { Controller, Get, Query, Request, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { WangService } from './wang.service';
import { resFormat } from 'src/common/global';
import config from 'src/config';

@ApiTags('王者荣耀接口')
@Controller('wang')
export class WangController {
  constructor(private readonly wangService: WangService) { }

  private readonly logger = new Logger(WangController.name);

  // 获取王者荣耀题目列表
  @Get('request/list')
  @ApiOperation({ summary: '获取王者荣耀题目列表' })
  @ApiQuery({ name: 'question', description: '题目编号' })
  // @ApiQuery({ name: 'openid', description: 'openid' })
  getQuestionList(@Request() req, @Query() query) {
    // console.log('authorization:', req.headers.authorization)
    // console.log('access_token:', req.cookies)
    this.logger.debug(config.access_token, 'access_token');
    this.logger.debug(req.headers.authorization, 'authorization');
    if (req.headers.authorization !== config.access_token) {
      return resFormat(false, null, '您还未登录或登录已过期，请重新登录')
    }
    return this.wangService.getQuestionList(query);
  }
}
