import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
