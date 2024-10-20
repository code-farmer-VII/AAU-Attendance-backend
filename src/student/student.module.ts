import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './entities/student.entity';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]), 
    TeacherModule, 
  ],
  providers: [
    StudentService, 
    StudentResolver 
  ],
  exports: [StudentService], 
})
export class StudentModule {}
