import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './entities/student.entity';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]), // Registering the Student entity with TypeORM
    TeacherModule, // Importing TeacherModule for dependencies (e.g., GraphQL resolvers)
  ],
  providers: [
    StudentService, // Service responsible for business logic related to students
    StudentResolver // Resolver that defines GraphQL queries and mutations for students
  ],
  exports: [StudentService], // Allows StudentService to be used by other modules if necessary
})
export class StudentModule {}
