import { Injectable } from '@nestjs/common';
import { requestUrl, resFormat } from 'src/common/global';

@Injectable()
export class AuthService {

  // 登录00
  async login(req, data) {

    let { code } = data
    let params = {
      code,
      appid: 'tt451f33a2da25a6fa',
      secret: '18818a0ba88f10d6cc7cc989da25e4abe7eca045'
    }

    // 成功body："{"anonymous_openid":"","error":0,"openid":"yOBLTVfLT9cl5KRj","session_key":"o49VSgXPR7e30iKo20AB2g=="}"
    // 失败body："{"errcode":40014,"errmsg":"bad params","error":1,"message":"bad parameters"}"
    let res: any = await requestUrl('https://developer.toutiao.com/api/apps/jscode2session', 'GET', params)

    // console.log(res)
    let resData: any = JSON.parse(res)
    // console.log(resData)
    // console.log(res, typeof res)

    req.session.openid = resData.openid
    console.log(req.session.openid)

    if (res) {
      return resFormat(true, resData.openid, null);
    } else { 
      return resFormat(false, null, '');
    }

 
    // request({
    //   url: 'https://developer.toutiao.com/api/apps/jscode2session',
    //   method: 'GET',
    //   json: true,
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   data: params
    // }, (err, res, body) => {
    //   console.log('请求成功', body)
    //   if (err) {
    //     return '登录失败：' + err;
    //   }
    //   return res;
    // })
  }
}
