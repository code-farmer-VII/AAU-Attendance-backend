import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAttendanceDto } from './create-attendance.input';


@InputType()
export class UpdateAttendanceInput extends PartialType(CreateAttendanceDto) {
  @Field(() => Int)
  id: number;
}
