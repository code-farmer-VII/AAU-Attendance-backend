import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateTeacherDto } from './create-teacher.input';

@InputType()
export class UpdateTeacherInput extends PartialType(CreateTeacherDto) {
  @Field(() => Int)
  id: number;
}
