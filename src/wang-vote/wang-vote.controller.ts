import { Controller, Get, Request, Post } from '@nestjs/common';
import { WangVoteService } from './wang-vote.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('王者荣耀投票返场')
@Controller('wang-vote')
export class WangVoteController {
  constructor(private readonly wangVoteService: WangVoteService) { }

  // 获取英雄列表
  @Get('list')
  @ApiOperation({ summary: '获取英雄列表' })
  getList(@Request() req) {
    return this.wangVoteService.getList(req);
  }

  // 用户投票
  @Post('vote')
  @ApiOperation({ summary: '用户投票' })
  vote(@Request() req) {
    return this.wangVoteService.vote(req);
  }
}
