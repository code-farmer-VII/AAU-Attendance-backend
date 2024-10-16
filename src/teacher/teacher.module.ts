import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { Teacher } from './entities/teacher.entity';
import { UserModule } from 'src/user/user.module'; // Assuming you have a UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    UserModule, // Import UserModule to handle the User relationship
  ],
  providers: [TeacherService, TeacherResolver],
  exports: [TeacherService], // Export the service if needed by other modules
})
export class TeacherModule {}
