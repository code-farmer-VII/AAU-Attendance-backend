import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeteriaAttendanceResolver } from './cafteria-attendance.resolver';
import { CafeteriaAttendanceService } from './cafteria-attendance.service';
import { CafeteriaAttendance } from './entities/cafteria-attendance.entity';
import { Student } from 'src/student/entities/student.entity';  
// import { TeacherModule } from 'src/teacher/teacher.module';
import { AttendanceModule } from 'src/attendance/attendance.module';
@Module({
  imports: [
    // TeacherModule,  
    AttendanceModule,
    TypeOrmModule.forFeature([CafeteriaAttendance, Student]), 
  ],
  providers: [
    CafeteriaAttendanceService,  
    CafeteriaAttendanceResolver, 
  ],
})
export class CafeteriaAttendanceModule {}
