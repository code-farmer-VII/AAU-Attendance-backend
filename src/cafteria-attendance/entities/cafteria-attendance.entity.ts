import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MealTime } from 'src/enum/mealTime.enum';
import { Student } from 'src/student/entities/student.entity';
@ObjectType()
@Entity()
export class CafeteriaAttendance {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Student)
  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  student: Student;

  @Field(() => MealTime)
  @Column({ type: 'enum', enum: MealTime })
  mealTime: MealTime;

  @Field()
  @Column()
  attendanceDate: string;

  @Field()
  @Column()
  attendanceTime: string;
}
