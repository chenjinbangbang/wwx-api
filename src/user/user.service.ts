import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

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

}
