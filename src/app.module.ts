import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';  // Import ApolloDriver here
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Attendance } from './attendance/entities/attendance.entity';
import { CafeteriaAttendance } from './cafteria-attendance/entities/cafteria-attendance.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { Student } from './student/entities/student.entity';
import { StudentModule } from './student/student.module';
import { AttendanceModule } from './attendance/attendance.module';
import { CafeteriaAttendanceModule } from './cafteria-attendance/cafteria-attendance.module';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,  // Explicitly define the driver as ApolloDriver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // 'mysql', 'sqlite', etc. depending on your DB
      host: 'localhost',
      port: 5432,       // Port for PostgreSQL
      username: 'postgres',
      password: '1216192127',
      database: 'AttendanceSystem', // Your DB name
      entities: [User,Attendance, CafeteriaAttendance,Teacher, Student], // Entities should be added here
      synchronize: true, // Set to false in production!
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Attendance, CafeteriaAttendance,Teacher, Student]),
    StudentModule,
    AttendanceModule,
    CafeteriaAttendanceModule,
    TeacherModule,
    UserModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
