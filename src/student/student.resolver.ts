import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Student)
  async createStudent(
    @Args('createStudentDto') createStudentDto: CreateStudentDto,
    // @CurrentUser() user: any // Here, the user is injected via the decorator
  ): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Student], { name: 'students' })
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Student, { name: 'student' })
  async findOne(@Args('id') id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Student)
  async updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
    // @CurrentUser() user: any // Inject the current user
  ): Promise<Student> {
    return this.studentService.update(updateStudentInput.id, updateStudentInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeStudent(@Args('id') id: number): Promise<boolean> {
    await this.studentService.remove(id);
    return true;
  }
}
