import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WangService } from './wang.service';

@ApiTags('王者荣耀接口')
@Controller('wang')
export class WangController {
  constructor(private readonly wangService: WangService) { }

  // 获取王者荣耀题目列表
  @Get('request/list')
  @ApiOperation({ summary: '获取王者荣耀题目列表' })
  getQuestionList() { 
    return this.wangService.getQuestionList();
  }
}
