import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import InputType and Field from @nestjs/graphql
import { CreateUserDto } from 'src/user/dto/create-user.input';
@InputType() // Define CreateTeacherDto as a GraphQL input type
export class CreateTeacherDto {
  @Field() // Define college as a GraphQL field
  @IsNotEmpty()
  college: string;

  @Field(() => CreateUserDto) // Define user as a GraphQL field and map it to CreateUserDto
  @IsNotEmpty()
  user: CreateUserDto;
}