import { Injectable, Logger } from '@nestjs/common';
import { resFormat } from 'src/common/global';
import { Repository, ConnectionManager, Connection, getConnection } from 'typeorm'

@Injectable()
export class WangService {
  constructor(private readonly connection: Connection) { }
  private readonly logger = new Logger(WangService.name);

  // 获取某个王者荣耀题目
  async getQuestionList(data) {
    this.logger.log(data, '获取某个王者荣耀题目')
    let { question } = data

    let res = await getConnection().query(`select id, title, content, option1, option2, option3, option4, answer from wang_question_bank where id = ${question}`);

    // let res = await getConnection().createQueryBuilder()
    //   .select(['id', 'title', 'content'])
    //   .getOne()


    // let res = await this.connection.manager.findOne('wang_question_bank', 1)

    if (res.length > 0) {
      return resFormat(true, res[0], null);
    } else {
      return resFormat(false, null, '该题目不存在');
    }
  }
}
