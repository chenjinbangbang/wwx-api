import { Injectable } from '@nestjs/common';
import { requestUrl, resFormat } from 'src/common/global';
// import crypto from 'crypto';

@Injectable()
export class AuthService {

  // 登录00
  async login(req, data) {
    let { code } = data;

    // code2Session
    // 成功body："{"anonymous_openid":"","error":0,"openid":"yOBLTVfLT9cl5KRj","session_key":"o49VSgXPR7e30iKo20AB2g=="}"
    // 失败body："{"errcode":40014,"errmsg":"bad params","error":1,"message":"bad parameters"}"
    let params = {
      code,
      appid: 'tt451f33a2da25a6fa',
      secret: '18818a0ba88f10d6cc7cc989da25e4abe7eca045'
    };
    let res: any = await requestUrl('https://developer.toutiao.com/api/apps/jscode2session', 'GET', params);
    let resData: any = JSON.parse(res);

    // getAccessToken
    // {"access_token":"58a6779780e1b4b8325452f2f5a6e2504b3e36c146cf87947895b9cf6dec1dfc91bf13a0f086850ca6bcb7c128d370d710b5ffac2c07e8499b487fcffc4c93b3e89a9e8e4b1d91fc4085be6aac552","expires_in":7200}"
    let params1 = {
      appid: 'tt451f33a2da25a6fa',
      secret: '18818a0ba88f10d6cc7cc989da25e4abe7eca045',
      grant_type: 'client_credential'
    };
    let res1: any = await requestUrl('https://developer.toutiao.com/api/apps/token', 'GET', params1);
    console.log(res1);
    let res1Data: any = JSON.parse(res1);

    // setUserStorage，以key-value形式上报用户数据到字节跳动的云存储服务
    // let params2 = {
    //   access_token: res1Data.access_token,
    //   openid: resData.openid,
    //   signature: '', // 用户登录态签名
    //   sig_method: 'hmac_sha256', // 用户登录态签名的编码方法
    //   kv_list: '' // (body中)要设置的用户数据
    // };
    // let res2: any = await requestUrl('https://developer.toutiao.com/api/apps/set_user_storage', 'POST', params2);
    // console.log(res2);
    // let res2Data: any = JSON.parse(res2);

    // req.session.openid = resData.openid
    // console.log(req.session.openid)

    req.session.access_token = 'Baerar ' + res1Data.access_token

    if (res1Data.access_token) {
      return resFormat(true, res1Data, null);
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
