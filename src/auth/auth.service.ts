import { Injectable, Logger } from '@nestjs/common';
import { requestUrl, resFormat } from 'src/common/global';
import { InjectRepository } from '@nestjs/typeorm';
// import crypto from 'crypto';
import config from 'src/config';

// jwt签发
import { JwtService } from '@nestjs/jwt'; // 不要忘记将jwtService提供者注入到AuthService
import { jwtConstants } from './constants';
// import { UserService } from 'src/user/user.service';
// import { User } from 'src/entity/user.entity';

// 加密crypto
import crypto = require('crypto');
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }
  private readonly logger = new Logger(AuthService.name);

  // 用户登录
  async login(req, data) {
    this.logger.log(data, '用户登录')
    let { code } = data;

    // code2Session
    // 成功body："{"anonymous_openid":"","error":0,"openid":"yOBLTVfLT9cl5KRj","session_key":"o49VSgXPR7e30iKo20AB2g=="}"
    // 失败body："{"errcode":40014,"errmsg":"bad params","error":1,"message":"bad parameters"}"
    let params = {
      code,
      appid: config.appid,
      secret: config.secret
    };
    let res: any = await requestUrl('https://developer.toutiao.com/api/apps/jscode2session', 'GET', params);
    let resData: any = JSON.parse(res);
    this.logger.debug(resData);

    this.logger.log(resData, 'code2Session');

    if (!resData.openid) {
      return resFormat(false, null, resData.errmsg);
    }

    // getAccessToken
    // {"access_token":"58a6779780e1b4b8325452f2f5a6e2504b3e36c146cf87947895b9cf6dec1dfc91bf13a0f086850ca6bcb7c128d370d710b5ffac2c07e8499b487fcffc4c93b3e89a9e8e4b1d91fc4085be6aac552","expires_in":7200}"
    let params1 = {
      appid: config.appid,
      secret: config.secret,
      grant_type: 'client_credential'
    };
    let res1: any = await requestUrl('https://developer.toutiao.com/api/apps/token', 'GET', params1);
    // console.log(res1);
    let res1Data: any = JSON.parse(res1);
    this.logger.debug(res1Data);

    this.logger.log(res1Data, 'getAccessToken');

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

    // req.session.access_token = 'Bearer ' + res1Data.access_token;
    // console.log('存储token:', req.session.access_token)
    // req.cookie('access_token', res1Data.access_token, {
    //   maxAge: 1000 * 60 * 60 * 24,
    //   httpOnly: true
    // });

    // config.access_token = res1Data.access_token;
    // config.openid = resData.openid;



    if (res1Data.access_token) {

      // 判断该用户是否存在，存在则不处理，否则注册
      let openid = resData.openid;
      let user = await this.userService.getUser(openid);
      if (!user) {
        let params = { openid }

        // 新增用户
        let userData = this.userRepo.create(params);
        await this.userRepo.save(userData);

        user = await this.userService.getUser(openid);
      }

      let access_token = this.jwtService.sign({ openid, access_token: res1Data.access_token, id: user.id })

      let newRes = {
        access_token,
        expires_in: res1Data.expires_in
      }
      return resFormat(true, newRes, null);
    } else {
      return resFormat(false, null, '登录失败，请重新登录');
    }
  }

  // 验证用户，先在数据库查找该用户， 然后把result放到token信息里面，在local.strategy.ts执行
  async validateUser(openid: string): Promise<any> {
    console.log('验证用户，先在数据库查找该用户， 然后把result放到token信息里面，在local.strategy.ts执行')
    const user = await this.userService.getUser(openid);

    if (user) {
      // 更新登录时间
      // await this.userRepo.update(user.id, { last_login_time: new Date() })

      return user;
    }
    return null;
  }

}
