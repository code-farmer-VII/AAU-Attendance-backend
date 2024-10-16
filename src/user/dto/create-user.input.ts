import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import InputType and Field from @nestjs/graphql
import { UserRole } from 'src/enum/userRole.enum'; // Ensure the enum is correctly imported

@InputType() // Define CreateUserDto as a GraphQL input type
export class CreateUserDto {
  @Field() // Define email as a GraphQL field
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field() // Define password as a GraphQL field
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => UserRole) // Define role as a GraphQL field and map it to the UserRole enum
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @Field() // Define college as a GraphQL field
  @IsNotEmpty()
  college: string;
}
