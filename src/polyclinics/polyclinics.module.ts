import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Polyclinic } from './polyclinic.entity';
import { PolyclinicsService } from './polyclinics.service';
import { PolyclinicsController } from './polyclinics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Polyclinic])],
  controllers: [PolyclinicsController],
  providers: [PolyclinicsService],
})
export class PolyclinicsModule {}
