import { Module } from '@nestjs/common';
import { WangVoteController } from './wang-vote.controller';
import { WangVoteService } from './wang-vote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WangVote } from 'src/entity/wang_vote.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([WangVote]), UserModule],
  controllers: [WangVoteController],
  providers: [WangVoteService]
})
export class WangVoteModule { }
