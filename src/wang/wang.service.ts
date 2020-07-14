import { Injectable } from '@nestjs/common';
import { resFormat } from 'src/common/global';
import { Rerpository, ConnectionManager, Connection } from 'typeorm'

@Injectable()
export class WangService {

  // 获取王者荣耀题目列表
  async getQuestionList() {
    // let list = await 
    return resFormat(true, 'xxx', null);
  }
}
