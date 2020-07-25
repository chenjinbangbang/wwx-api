import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { WangVoteService } from './wang-vote.service';
import { ApiOperation, ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { resFormat } from 'src/common/global';

// 响应实体
import { responseDto } from 'src/common/dto';
import { VoteDto } from './dto/wang_vote.dto';
import { getListResDto, getVoteResDto } from './dto/wang_vote_res.dto';

@ApiTags('王者荣耀投票返场')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiResponse({ status: 200, description: 'OK' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@ApiResponse({ status: 404, description: 'Not Found' })
@Controller('wang-vote')
export class WangVoteController {
  constructor(
    private readonly wangVoteService: WangVoteService,
    private readonly userService: UserService
  ) { }

  // 获取英雄列表
  @Get('list')
  @ApiOperation({ summary: '获取英雄列表' })
  @ApiResponse({ status: 200, type: getListResDto })
  getList(@Request() req) {
    return this.wangVoteService.getList();
  }

  // 王者荣耀投票
  @Post('vote')
  @ApiOperation({ summary: '王者荣耀投票' })
  @ApiBody({ type: VoteDto })
  @ApiResponse({ status: 200, type: responseDto })
  vote(@Request() req, @Body() body) {
    return this.wangVoteService.vote(req.user, body);
  }

  // 增加用户最多可投票的次数
  @Post('vote/add')
  @ApiOperation({ summary: '增加用户最多可投票的次数' })
  @ApiResponse({ status: 200, type: responseDto })
  voteAlter(@Request() req) {
    return this.wangVoteService.voteAlter(req.user);
  }

  // 获取某个用户的王者荣耀投票次数和可投票的次数
  @Get('vote/get')
  @ApiOperation({ summary: '获取某个用户的王者荣耀投票次数和可投票的次数' })
  @ApiResponse({ status: 200, type: getVoteResDto })
  async getVote(@Request() req) {
    let user = await this.userService.getUser(req.user.openid);
    return resFormat(true, { vote: user.vote, voteNum: user.voteNum }, null);
  }
}
