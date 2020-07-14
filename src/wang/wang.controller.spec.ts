import { Test, TestingModule } from '@nestjs/testing';
import { WangController } from './wang.controller';

describe('Wang Controller', () => {
  let controller: WangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WangController],
    }).compile();

    controller = module.get<WangController>(WangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
