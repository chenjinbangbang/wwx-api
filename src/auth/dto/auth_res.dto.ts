import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { responseDto } from "src/common/dto";

// 用户登录响应实体
export class loginResDto extends responseDto {
  @ApiProperty({
    type: 'object',
    properties: {
      access_token: {
        type: 'string',
        description: 'token'
      },
      expires_in: {
        type: 'string',
        description: '有效时间'
      },
    }
  })
  data: any[]
}