import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

// 王者荣耀投票实体
export class VoteDto {
  @ApiProperty({
    description: '英雄编号'
  })
  @IsInt()
  readonly id: number;
}