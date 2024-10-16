import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql'; // Import @InputType and @Field
import { AttendanceStatus } from 'src/enum/attendanceStatus.enum'; // Make sure the enum is correctly imported

@InputType() // Define this class as a GraphQL input type
export class CreateAttendanceDto {
  @Field() // Define studentId as a GraphQL field
  @IsNotEmpty()
  studentId: number;

  @Field() // Define teacherId as a GraphQL field
  @IsNotEmpty()
  teacherId: number;

  @Field() // Define attendanceDate as a GraphQL field
  @IsNotEmpty()
  @IsDateString()
  attendanceDate: string;

  @Field() // Define attendanceTime as a GraphQL field
  @IsNotEmpty()
  @IsDateString()
  attendanceTime: string;

  @Field(() => AttendanceStatus) // Define status as a GraphQL field and map it to the enum
  @IsNotEmpty()
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
