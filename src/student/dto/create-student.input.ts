import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql'; 
import { PartialType } from '@nestjs/mapped-types';

@InputType() 
export class CreateStudentDto {
  @Field() 
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field() 
  @IsNotEmpty()
  @IsString()
  college: string;

  @Field() 
  @IsNotEmpty()
  @IsString()
  department: string;

  @Field() 
  @IsNotEmpty()
  @IsString()
  section: string;

  @Field() 
  @IsNotEmpty()
  @IsString()
  qrCode: string;

  @Field()  
  @IsNotEmpty()
  @IsNumber() 
  teacherId: number; 
}
