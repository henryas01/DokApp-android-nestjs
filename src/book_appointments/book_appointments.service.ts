import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookAppointment } from './book_appointments.entity';
import { CreateBookAppointmentDto } from './dto/create-book-appointment.dto';
import { User } from '../users/user.entity';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateBookAppointmentDto } from './dto/update-book-appointment.dto';

@Injectable()
export class BookAppointmentsService {
  constructor(
    @InjectRepository(BookAppointment)
    private readonly repo: Repository<BookAppointment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(
    userId: number,
    data: CreateBookAppointmentDto,
  ): Promise<BookAppointment> {
    const doctor = await this.userRepo.findOneBy({ id: data.doctor_id });
    if (!doctor || doctor.is_patient)
      throw new BadRequestException('Invalid doctor ID');

    const appointmentDate = new Date(
      `${new Date().getFullYear()}-${data.month.padStart(2, '0')}-${data.date.padStart(2, '0')}`,
    );

    const appointment = this.repo.create({
      ...data,
      user: { id: userId } as User,
      doctor,
      appointment_date: appointmentDate.toISOString().split('T')[0],
    });

    return await this.repo.save(appointment);
  }

  /**
   * Finds all appointments booked by a specific user (where the user is the patient).
   * @param userId The ID of the user (patient).
   * @returns An array of BookAppointment entities.
   */
  async getAppointmentsByUserId(userId: number): Promise<BookAppointment[]> {
    return this.repo.find({
      where: {
        // Find appointments where the 'user' relation has an ID matching userId
        user: { id: userId },
      },
      // Optionally load the related user and doctor data for a complete response
      relations: ['user', 'doctor'],
    });
  }

  async findAll(): Promise<BookAppointment[]> {
    return this.repo.find({
      relations: ['user', 'doctor'],
    });
  }

  async getAppointmentById(id: number): Promise<BookAppointment> {
    // const appointment = await this.repo.findOneBy({ id });
    const appointment = await this.repo.findOne({
      where: { id },
      relations: ['user', 'doctor'],
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  /**
   * Fully updates an existing BookAppointment record.
   * @param id The ID of the appointment to update.
   * @param data The new data to apply.
   * @returns The updated BookAppointment entity.
   */
  async update(
    id: number,
    data: UpdateBookAppointmentDto,
  ): Promise<BookAppointment> {
    const appointment = await this.repo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    // 1. --- Check and Update Doctor Relation ---
    if (data.doctor_id) {
      const newDoctor = await this.userRepo.findOneBy({ id: data.doctor_id });

      if (!newDoctor || newDoctor.is_patient) {
        throw new BadRequestException('Invalid doctor ID provided for update.');
      }

      // Assign the full entity to the relation property
      appointment.doctor = newDoctor;

      // Remove doctor_id from data so Object.assign doesn't try to assign the number
      delete data.doctor_id;
    }
    // ------------------------------------------

    // 2. Handle updating appointment_date if month/date fields are provided
    if (data.month || data.date) {
      // Use existing values if new ones aren't provided
      const month = data.month || appointment.month;
      const date = data.date || appointment.date;

      const appointmentDate = new Date(
        `${new Date().getFullYear()}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`,
      );
      data['appointment_date'] = appointmentDate.toISOString().split('T')[0];
    }
    Object.assign(appointment, data);

    return this.repo.save(appointment);
  }

  // Only Doctor can update status
  async updateStatus(
    id: number,
    dto: UpdateStatusDto,
  ): Promise<BookAppointment> {
    const appointment = await this.repo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    appointment.status = dto.status;
    return this.repo.save(appointment);
  }

  /**
   * Deletes a BookAppointment record by its ID.
   * @param id The ID of the appointment to delete.
   * @returns The deleted BookAppointment entity.
   */
  async remove(id: number): Promise<BookAppointment> {
    const appointment = await this.repo.findOneBy({ id });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found.`);
    }

    // Use the remove method of the repository to delete the entity
    await this.repo.remove(appointment);

    // Return the deleted entity (optional, but good practice)
    return appointment;
  }

  /**
   * Finds all appointments scheduled with a specific doctor.
   * @param doctorId The ID of the doctor (User entity).
   * @returns An array of BookAppointment entities.
   */
  async getAppointmentsByDoctorId(
    doctorId: number,
  ): Promise<BookAppointment[]> {
    return this.repo.find({
      where: {
        // Find appointments where the 'doctor' relation has an ID matching doctorId
        doctor: { id: doctorId },
      },
      // Include user (patient) and doctor details in the response
      relations: ['user', 'doctor'],
    });
  }
}
