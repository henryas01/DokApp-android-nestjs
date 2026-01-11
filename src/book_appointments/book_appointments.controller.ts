import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';

import { BookAppointmentsService } from './book_appointments.service';

import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';

import { UpdateStatusDto } from './dto/update-status.dto';
import { BookAppointment } from './book_appointments.entity';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';

@Controller('book-appointments')
export class BookAppointmentsController {
  constructor(private readonly service: BookAppointmentsService) {}

  @Post()
  create(@Body() data: CreateBookAppointmentDto) {
    const userId = data.user_id; // TODO: replace with @Req.user.id after JWT

    return this.service.create(userId, data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /api/book-appointments/user/:userId
  @Get('user/:userId')
  async getAppointmentsByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<BookAppointment[]> {
    // This calls the new method you added in the service
    return this.service.getAppointmentsByUserId(userId);
  }

  // GET /api/book-appointments/:id
  @Get(':id')
  async getAppointmentId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookAppointment> {
    // This calls the new method you added in the service
    return this.service.getAppointmentById(id);
  }

  // NEW ENDPOINT: PUT /book-appointments/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookAppointmentDto,
  ): Promise<BookAppointment> {
    return this.service.update(id, dto);
  }

  // PATCH /api/book-appointments/:id/status
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,

    @Body() dto: UpdateStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BookAppointment> {
    return this.service.remove(id);
  }

  @Get('doctor/:doctorId')
  async getAppointmentsByDoctor(
    @Param('doctorId', ParseIntPipe) doctorId: number,
  ): Promise<BookAppointment[]> {
    return this.service.getAppointmentsByDoctorId(doctorId);
  }
}
