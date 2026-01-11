import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Polyclinic } from './polyclinic.entity';

@Injectable()
export class PolyclinicsService {
  constructor(
    @InjectRepository(Polyclinic)
    private readonly repo: Repository<Polyclinic>,
  ) {}

  // ✅ Only reads data — no insert, no update
  async findAll(): Promise<Polyclinic[]> {
    return this.repo.find(); // Just SELECT * FROM polyclinics
  }
}
