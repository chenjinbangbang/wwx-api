import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { responseDto } from "src/common/dto";

// 获取英雄列表响应实体
export class getListResDto extends responseDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: '英雄编号'
        },
        name: {
          type: 'string',
          description: '英雄姓名'
        },
        imgUrl: {
          type: 'string',
          description: '英雄头像'
        },
        imgUrlActive: {
          type: 'string',
          description: '英雄头像选中'
        },
        votes: {
          type: 'number',
          description: '英雄投票数'
        },
      }
    }
  })
  data: any[]
}

// 获取某个用户的王者荣耀投票次数响应实体
export class getVoteResDto extends responseDto {
  @ApiProperty({
    type: 'object',
    properties: {
      vote: {
        type: 'number',
        description: '用户投票次数',
      },
      voteNum: {
        type: 'number',
        description: '用户可投票的次数',
      }
    }
  })
  data: any
}