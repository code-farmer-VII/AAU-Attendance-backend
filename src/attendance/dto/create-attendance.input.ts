import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import @InputType and @Field
import { AttendanceStatus } from 'src/enum/attendanceStatus.enum'; // Make sure the enum is correctly imported

@InputType() 
export class CreateAttendanceDto {
  @Field() 
  @IsNotEmpty()
  studentId: number;

  @Field() 
  @IsNotEmpty()
  teacherId: number;

  @Field() 
  @IsNotEmpty()
  @IsDateString()
  attendanceDate: string;

  @Field() 
  @IsNotEmpty()
  @IsDateString()
  attendanceTime: string;

  @Field(() => AttendanceStatus) 
  @IsNotEmpty()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
