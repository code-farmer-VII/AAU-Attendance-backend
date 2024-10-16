import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeteriaAttendanceResolver } from './cafteria-attendance.resolver';
import { CafeteriaAttendanceService } from './cafteria-attendance.service';
import { CafeteriaAttendance } from './entities/cafteria-attendance.entity';
import { Student } from 'src/student/entities/student.entity';  // Assuming you have a Student entity imported

@Module({
  imports: [
    TypeOrmModule.forFeature([CafeteriaAttendance, Student]), // Importing the CafeteriaAttendance and Student entities
  ],
  providers: [
    CafeteriaAttendanceService,  // Service to handle business logic
    CafeteriaAttendanceResolver, // Resolver to handle GraphQL operations
  ],
})
export class CafeteriaAttendanceModule {}
