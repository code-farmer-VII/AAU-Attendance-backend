import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateStudentDto } from './create-student.input';


@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentDto) {
  @Field(() => Int)
  id: number;
}
