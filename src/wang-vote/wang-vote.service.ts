import { Injectable, Logger } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { resFormat } from 'src/common/global';
import { InjectRepository } from '@nestjs/typeorm';
import { WangVote } from 'src/entity/wang_vote.entity';
import { UserService } from 'src/user/user.service';

// 定时人数
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WangVoteService {
  constructor(
    @InjectRepository(WangVote) private readonly wangVoteRepo: Repository<WangVote>,
    private readonly userService: UserService
  ) { }
  private readonly logger = new Logger(WangVoteService.name);

  // 每天0点执行一次
  @Cron('0 0 0 * * *')
  async handleCron() {
    // 每天0点时用户的英雄投票清0
    // let update = await this.userService.updateAll({ vote: 0 })
    let update = await getConnection().query('update user set vote = 0, voteNum = 1');
    if (update.affectedRows > 0) {
      this.logger.log('每天0点时用户的英雄投票清0-成功');
    } else {
      this.logger.log('每天0点时用户的英雄投票清0-失败');
    }
  }

  // 获取英雄列表
  async getList() {
    // let res: any[] = await getConnection().query('select * from wang_vote');
    let res: any[] = await this.wangVoteRepo.find();

    return resFormat(true, res, null);
  }

  // 王者荣耀投票
  async vote(user, data) {
    this.logger.log(data, '王者荣耀投票');
    const { id, openid } = user;
    const { id: hero_id } = data;
    // let res = await getConnection().query(`select * from wang_vote where openid = ${openid}`);
    let res: any = await this.userService.getUser(openid);

    // 判断用户是否投票
    if (res.vote < res.voteNum) {

      // 更新某个用户的当天投票
      let update = await this.userService.update(id, { vote: res.vote + 1 });

      // 更新某个英雄的投票数
      let updateHero = await this.wangVoteRepo.query(`update wang_vote set votes = concat(votes + 1) where id = ${hero_id}`);

      if (update.raw.affectedRows > 0 && updateHero.affectedRows > 0) {
        return resFormat(true, '投票成功！！', null);
      } else {
        return resFormat(false, null, '今天已经投票过了，不能再投票了噢！！');
      }
    } else {
      return resFormat(false, null, '今天已经投票过了，不能再投票了噢！！');
    }
  }

  // 增加用户最多可投票的次数
  async voteAlter(user) {
    this.logger.log('增加用户最多可投票的次数');
    const { id } = user;

    let updateHero = await getConnection().query(`update user set voteNum = concat(voteNum + 1) where id = ${id}`);
    this.logger.log(updateHero, '增加用户最多可投票的次数');

    if (updateHero.affectedRows > 0) {
      return resFormat(true, '增加投票次数成功！！', null);
    } else {
      return resFormat(false, null, '增加投票次数成功失败');
    }
  }
}
