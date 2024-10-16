import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCafeteriaAttendanceDto } from './create-cafteria-attendance.input';

@InputType()
export class UpdateCafteriaAttendanceInput extends PartialType(CreateCafeteriaAttendanceDto) {
  @Field(() => Int)
  id: number;
}
