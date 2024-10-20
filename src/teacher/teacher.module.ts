import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { Teacher } from './entities/teacher.entity';
// import { UserModule } from 'src/user/user.module'; 
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Teacher]),
    // UserModule, 
  ],
  providers: [TeacherService, TeacherResolver],
  exports: [TeacherService], 
})
export class TeacherModule {}
