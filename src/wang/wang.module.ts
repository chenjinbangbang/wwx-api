import { Module } from '@nestjs/common';
import { WangController } from './wang.controller';
import { WangService } from './wang.service';

@Module({
  controllers: [WangController],
  providers: [WangService]
})
export class WangModule {}
