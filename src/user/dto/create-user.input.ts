import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; 
import { UserRole } from 'src/enum/userRole.enum';

@InputType() 
export class CreateUserDto {
  @Field() 
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field() 
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => UserRole) 
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @Field() 
  @IsNotEmpty()
  college: string;
}
