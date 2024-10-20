import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; 
import { MealTime } from 'src/enum/mealTime.enum'; 
@InputType() 
export class CreateCafeteriaAttendanceDto {
  @Field() 
  @IsNotEmpty()
  studentId: number;

  @Field(() => MealTime) 
  @IsNotEmpty()
  @IsEnum(MealTime)
  mealTime: MealTime;

  @Field() 
  @IsNotEmpty()
  @IsDateString()
  attendanceDate: string;

  @Field() 
  @IsNotEmpty()
  @IsDateString()
  attendanceTime: string;
}
