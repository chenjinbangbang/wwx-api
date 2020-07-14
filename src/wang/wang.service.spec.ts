import { Test, TestingModule } from '@nestjs/testing';
import { WangService } from './wang.service';

describe('WangService', () => {
  let service: WangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WangService],
    }).compile();

    service = module.get<WangService>(WangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
