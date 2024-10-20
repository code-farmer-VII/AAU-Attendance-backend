import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; 
import { CreateUserDto } from 'src/user/dto/create-user.input';
@InputType() 
export class CreateTeacherDto {

  // @Field(() => CreateUserDto) 
  // @IsNotEmpty()
  // user: CreateUserDto;

  @Field() 
  @IsNotEmpty()
  @IsString()
  userId: string;
}