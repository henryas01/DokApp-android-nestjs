import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBookAppointmentDto } from './create-book-appointment.dto';

// Makes all fields from CreateBookAppointmentDto optional
// export class UpdateBookAppointmentDto extends PartialType(
//   CreateBookAppointmentDto,
// ) {
//   // You might want to explicitly exclude user_id and doctor_id if they shouldn't change
//   // For simplicity, we'll allow them for now, but a real-world app might forbid changing these.
// }

export class UpdateBookAppointmentDto extends PartialType(
  OmitType(CreateBookAppointmentDto, ['user_id', 'status'] as const),
) {}
