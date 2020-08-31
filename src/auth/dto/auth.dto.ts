import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsMobilePhone, IsEmail, Matches } from "class-validator";

// 登录实体
export class LoginDto {
  @ApiProperty({
    description: '小程序code'
  })
  @IsString()
  readonly code: string;
}

// 用户账号密码登录实体
export class UserLoginDto {
  @ApiProperty({
    description: '用户名'
  })
  @IsString()
  @Matches(/^\w{6,18}$/, { message: '用户名由6-18个字符，字母/数字/下划线组成' }) // 6-18个字符，字母/数字/下划线组成
  readonly username: string;

  @ApiProperty({
    description: '密码'
  })
  @IsString()
  @Matches(/^\w{8,18}$/, { message: '密码由8-18个字符，字母/数字/下划线组成' }) // 8-18个字符，字母/数字/下划线组成
  readonly password: string;
}

// 注册实体
export class RegisterDto {
  @ApiProperty({
    description: '用户名'
  })
  @IsString()
  @Matches(/^\w{6,18}$/, { message: '用户名由6-18个字符，字母/数字/下划线组成' }) // 6-18个字符，字母/数字/下划线组成
  readonly username: string;

  @ApiProperty({
    description: '密码'
  })
  @IsString()
  @Matches(/^\w{8,18}$/, { message: '密码由8-18个字符，字母/数字/下划线组成' }) // 8-18个字符，字母/数字/下划线组成
  readonly password: string;

  @ApiProperty({
    description: '确认密码'
  })
  @IsString()
  @Matches(/^\w{8,18}$/, { message: '确认密码由8-18个字符，字母/数字/下划线组成' }) // 8-18个字符，字母/数字/下划线组成
  readonly password_confirm: string;
}