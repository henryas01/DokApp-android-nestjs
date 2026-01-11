import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
// import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { PolyclinicsModule } from './polyclinics/polyclinics.module';
import { BookAppointmentsModule } from './book_appointments/book_appointments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST as string,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER as string,
      password: process.env.DB_PASS as string,
      database: process.env.DB_NAME as string,
      // entities: [User],
      autoLoadEntities: true,
      synchronize: true, // ⚠️ only in development
    }),
    UsersModule,
    AuthModule,
    PolyclinicsModule,
    BookAppointmentsModule,
  ],
})
export class AppModule {}
