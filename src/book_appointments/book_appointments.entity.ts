import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'book_appointments' })
export class BookAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  @Column({ type: 'varchar', length: 2 })
  month: string;

  @Column({ type: 'varchar', length: 2 })
  date: string;

  @Column({ type: 'varchar', length: 5 })
  time: string;

  @Column({ type: 'date' })
  appointment_date: string;

  @Column({ type: 'varchar', length: 100 })
  patient_name: string;

  @Column({ type: 'tinyint', comment: '0=Male, 1=Female' })
  gender: number;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  symptoms: string;

  @Column({ type: 'varchar', length: 25 })
  phone_number: string;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '0=Pending/Rejected, 1=Approved',
  })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
