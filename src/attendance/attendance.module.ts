import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceResolver } from './attendance.resolver';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [
    TeacherModule,
    TypeOrmModule.forFeature([Attendance, Student, Teacher]), // Import Attendance, Student, and Teacher entities
  ],
  providers: [
    AttendanceService,  // Provide the service for handling logic
    AttendanceResolver, // Provide the resolver for GraphQL
  ],
  exports: [AttendanceService],
})
export class AttendanceModule {}
