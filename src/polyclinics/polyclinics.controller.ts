import { Controller, Get } from '@nestjs/common';
import { PolyclinicsService } from './polyclinics.service';

@Controller('polyclinics') // 👈 this is the key
export class PolyclinicsController {
  constructor(private readonly service: PolyclinicsService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }
}
