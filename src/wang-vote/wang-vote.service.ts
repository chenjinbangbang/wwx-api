import { Injectable } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';
import { resFormat } from 'src/common/global';

@Injectable()
export class WangVoteService {
  constructor(private readonly connection: Connection) { }

  // 获取英雄列表
  async getList(req) {
    let res: any[] = await getConnection().query('select * from wang_vote');

    return resFormat(true, res, null);
  }

  // 用户投票
  async vote(req) {
    let res: any[] = await getConnection().query('select * from wang_vote');

    return resFormat(true, res, null);
  }
}
