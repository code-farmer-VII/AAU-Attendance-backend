import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import @InputType and @Field
import { MealTime } from 'src/enum/mealTime.enum'; // Ensure this enum is correctly defined and imported

@InputType() // Define CreateCafeteriaAttendanceDto as a GraphQL input type
export class CreateCafeteriaAttendanceDto {
  @Field() // Define studentId as a GraphQL field
  @IsNotEmpty()
  studentId: number;

  @Field(() => MealTime) // Define mealTime as a GraphQL field and map it to the enum
  @IsNotEmpty()
  @IsEnum(MealTime)
  mealTime: MealTime;

  @Field() // Define attendanceDate as a GraphQL field
  @IsNotEmpty()
  @IsDateString()
  attendanceDate: string;

  @Field() // Define attendanceTime as a GraphQL field
  @IsNotEmpty()
  @IsDateString()
  attendanceTime: string;
}
