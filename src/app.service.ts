import { Injectable } from '@nestjs/common';
import { resFormat } from 'src/common/global';

@Injectable()
export class AppService {
  getHello() {
    return resFormat(true, null, '接口访问正常！！');
  }
}
