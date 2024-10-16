import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql'; // Import Field and InputType from @nestjs/graphql
import { PartialType } from '@nestjs/mapped-types';

@InputType() // Make sure this class is recognized as an InputType in GraphQL
export class CreateStudentDto {
  @Field() // Mark the property as a GraphQL field
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field() // Mark the property as a GraphQL field
  @IsNotEmpty()
  @IsString()
  college: string;

  @Field() // Mark the property as a GraphQL field
  @IsNotEmpty()
  @IsString()
  department: string;

  @Field() // Mark the property as a GraphQL field
  @IsNotEmpty()
  @IsString()
  section: string;

  @Field() // Mark the property as a GraphQL field
  @IsNotEmpty()
  @IsString()
  qrCode: string;
}