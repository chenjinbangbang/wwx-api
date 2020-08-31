import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as os from 'os'

import { User } from 'src/entity/user.entity';
import { UserPv } from 'src/entity/user_pv.entity';
import { resFormat } from 'src/common/global';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserPv) private readonly userPvRepo: Repository<UserPv>
  ) { }
  private readonly logger = new Logger(UserService.name);

  // 查找用户
  async getUser(openid: string): Promise<User | undefined> {
    return this.userRepo.findOne({ openid })
  }

  // 更新某个用户的数据
  async update(id, data) {
    console.log(id, data)
    return this.userRepo.update(id, data);
  }

  // 更新全部用户的数据
  // async updateAll(data) {
  //   console.log(data)
  //   return this.userRepo.update(data);
  // }

  // 记录官网用户PV
  async setUserPv(data) {
    const { platform } = data;

    let mac = os.networkInterfaces()['以太网'][0].mac;
    this.logger.log(mac);

    // 判断mac地址是否存在，存在则更新访问次数，不存在则新建
    let res = await this.userPvRepo.findOne({ mac });
    if (res) {
      let update = await this.userPvRepo.query(`update user_pv set visit_num = concat(visit_num + 1), last_visit_time = now() where mac = '${mac}'`);
      if (update.affectedRows > 0) {
        return resFormat(true, null, '访问用户已存在，访问次数+1');
      } else { 
        return resFormat(false, null, '访问用户已存在，访问次数+1失败');
      }
    }

    let params = {
      platform,
      mac
    }
    let userPvData = this.userPvRepo.create(params);
    await this.userPvRepo.save(userPvData);

    return resFormat(true, null, '新用户访问+1');
  }
  
  // 获取官网用户PV值
  async getUserPv() { 
    let res = await this.userPvRepo.createQueryBuilder('user_pv')
      .select(['count(id) user_num', 'sum(visit_num) visit_num'])
      .getRawOne();
    
    return resFormat(true, res, null);
  }

}
