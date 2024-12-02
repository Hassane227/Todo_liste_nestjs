import { Test, TestingModule } from '@nestjs/testing';
import { PersonnesService } from './personnes.service';

describe('PersonnesService', () => {
  let service: PersonnesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonnesService],
    }).compile();

    service = module.get<PersonnesService>(PersonnesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
