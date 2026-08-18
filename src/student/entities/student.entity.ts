import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';


@ObjectType()
@Entity()
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  college: string;

  @Field()
  @Column()
  department: string;

  @Field()
  @Column()
  section: string;

  @Field()
  @Column({ unique: true })
  qrCode: string;

  @Field(() => Teacher) // Define the relationship field
  @ManyToOne(() => Teacher, { nullable: false }) // Establish a many-to-one relationship with Teacher
  @JoinColumn({ name: 'teacher_id' }) // Define the foreign key column name
  teacher: Teacher; // Reference to the Teacher entity
}
