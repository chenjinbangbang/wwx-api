import { Test, TestingModule } from '@nestjs/testing';
import { WangVoteService } from './wang-vote.service';

describe('WangVoteService', () => {
  let service: WangVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WangVoteService],
    }).compile();

    service = module.get<WangVoteService>(WangVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
