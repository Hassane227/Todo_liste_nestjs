import { Test, TestingModule } from '@nestjs/testing';
import { PersonnesController } from './personnes.controller';

describe('PersonnesController', () => {
  let controller: PersonnesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonnesController],
    }).compile();

    controller = module.get<PersonnesController>(PersonnesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
