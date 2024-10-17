import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CurrentUser } from 'src/current-user.decorator';


@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard) // Protect this mutation with JWT guard
  @Mutation(() => Student)
  async createStudent(
    @Args('createStudentDto') createStudentDto: CreateStudentDto,
    @CurrentUser() user: any // Optionally access the current authenticated user
  ): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @UseGuards(JwtAuthGuard) // Protect this query with JWT guard
  @Query(() => [Student], { name: 'students' })
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Protect this query with JWT guard
  @Query(() => Student, { name: 'student' })
  async findOne(@Args('id') id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard) // Protect this mutation with JWT guard
  @Mutation(() => Student)
  async updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
    @CurrentUser() user: any // Optionally access the current authenticated user
  ): Promise<Student> {
    return this.studentService.update(updateStudentInput.id, updateStudentInput);
  }

  @UseGuards(JwtAuthGuard) // Protect this mutation with JWT guard
  @Mutation(() => Boolean)
  async removeStudent(@Args('id') id: number): Promise<boolean> {
    await this.studentService.remove(id);
    return true;
  }
}
