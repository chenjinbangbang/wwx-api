import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

// 分页实体
export class PageDto {
  @ApiProperty({
    description: '当前页',
    default: 1
  })
  // @IsInt()
  // @Min(1, { message: '当前页不能少于1' })
  readonly page: number;

  @ApiProperty({
    description: '一页的条数',
    default: 10
  })
  // @IsInt()
  // @Min(1, { message: '一页的条数不能少于1' })
  readonly pageNum: number;
}

// 响应实体
export class responseDto {
  @ApiProperty({
    description: '是否成功失败'
  })
  readonly success: boolean;

  @ApiProperty({
    description: '返回数据'
  })
  readonly data: any;

  @ApiProperty({
    description: '返回信息'
  })
  readonly msg: string;
}