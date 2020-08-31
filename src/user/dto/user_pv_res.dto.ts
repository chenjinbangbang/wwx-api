import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { responseDto } from "src/common/dto";

// 获取官网用户PV值响应实体
export class pvResDto extends responseDto {
  @ApiProperty({
    type: 'object',
    properties: {
      user_num: {
        type: 'number',
        description: '用户总数'
      },
      visit_num: {
        type: 'number',
        description: '用户访问总次数'
      },
    }
  })
  data: any
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