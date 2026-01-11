import { Test, TestingModule } from '@nestjs/testing';
import { PolyclinicsService } from './polyclinics.service';

describe('PolyclinicsService', () => {
  let service: PolyclinicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolyclinicsService],
    }).compile();

    service = module.get<PolyclinicsService>(PolyclinicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
