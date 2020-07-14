import { Injectable } from '@nestjs/common';
const request = require('request')

@Injectable()
export class AuthService {

  // 登录00
  async login() {
    request({
      url: 'https://developer.toutiao.com/api/apps/jscode2session',
      method: 'GET',
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      data: {}
    }, (err, res, body) => {
      console.log('请求成功', body)
      if (err) {
        return '登录失败：' + err;
      }
      return res;
    })
    return '登录成功';
  }
}
