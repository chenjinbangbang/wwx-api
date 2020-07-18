import { Module } from '@nestjs/common';
import { WangVoteController } from './wang-vote.controller';
import { WangVoteService } from './wang-vote.service';

@Module({
  controllers: [WangVoteController],
  providers: [WangVoteService]
})
export class WangVoteModule {}
