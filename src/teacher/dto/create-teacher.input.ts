import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import InputType and Field from @nestjs/graphql
import { CreateUserDto } from 'src/user/dto/create-user.input';
@InputType() // Define CreateTeacherDto as a GraphQL input type
export class CreateTeacherDto {

  // @Field(() => CreateUserDto) // Define user as a GraphQL field and map it to CreateUserDto
  // @IsNotEmpty()
  // user: CreateUserDto;

  @Field() // Mark the property as a GraphQL field
  @IsNotEmpty()
  @IsString()
  userId: string;
}