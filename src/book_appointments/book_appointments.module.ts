import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookAppointment } from './book_appointments.entity';
import { User } from '../users/user.entity';
import { BookAppointmentsService } from './book_appointments.service';
import { BookAppointmentsController } from './book_appointments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookAppointment, User])],
  controllers: [BookAppointmentsController],
  providers: [BookAppointmentsService],
})
export class BookAppointmentsModule {}
