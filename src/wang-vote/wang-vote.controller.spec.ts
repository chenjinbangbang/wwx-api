import { Test, TestingModule } from '@nestjs/testing';
import { WangVoteController } from './wang-vote.controller';

describe('WangVote Controller', () => {
  let controller: WangVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WangVoteController],
    }).compile();

    controller = module.get<WangVoteController>(WangVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
