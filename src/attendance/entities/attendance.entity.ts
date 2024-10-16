import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AttendanceStatus } from 'src/enum/attendanceStatus.enum';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
@ObjectType()
@Entity()
export class Attendance {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Student)
  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  student: Student;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, { onDelete: 'CASCADE' })
  teacher: Teacher;

  @Field()
  @Column()
  attendanceDate: string;

  @Field()
  @Column()
  attendanceTime: string;

  @Field(() => AttendanceStatus)
  @Column({ type: 'enum', enum: AttendanceStatus })
  status: AttendanceStatus;
}
