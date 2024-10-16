import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDto) {
  @Field(() => Int)
  id: number;
}
