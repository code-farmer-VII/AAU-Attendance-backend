import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  async createStudent(@Args('createStudentDto') createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Query(() => [Student], { name: 'students' })
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Query(() => Student, { name: 'student' })
  async findOne(@Args('id') id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    return this.studentService.update(updateStudentInput.id, updateStudentInput);
  }

  @Mutation(() => Boolean)
  async removeStudent(@Args('id') id: number): Promise<boolean> {
    await this.studentService.remove(id);
    return true;
  }
}
