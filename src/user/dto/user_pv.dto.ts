import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

// 记录官网用户PV实体
export class pvDto { 
  @ApiProperty({
    description: '访问设备'
  })
  readonly platform: string;
}