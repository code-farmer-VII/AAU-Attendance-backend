import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CurrentUser } from 'src/current-user.decorator';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  // Mutation to create a new Teacher
  @UseGuards(JwtAuthGuard)  // Protect this mutation with JWT guard
  @Mutation(() => Teacher)
  async createTeacher(
    @Args('createTeacherDto') createTeacherDto: CreateTeacherDto,
    @CurrentUser() user: any  // Optionally access the current authenticated user
  ): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  // Query to get all Teachers
  @UseGuards(JwtAuthGuard)  // Protect this query with JWT guard
  @Query(() => [Teacher], { name: 'teachers' })
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  // Query to get a Teacher by ID
  @UseGuards(JwtAuthGuard)  // Protect this query with JWT guard
  @Query(() => Teacher, { name: 'teacher' })
  async findOne(@Args('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  // Mutation to update a Teacher
  @UseGuards(JwtAuthGuard)  // Protect this mutation with JWT guard
  @Mutation(() => Teacher)
  async updateTeacher(
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
    @CurrentUser() user: any  // Optionally access the current authenticated user
  ): Promise<Teacher> {
    return this.teacherService.update(updateTeacherInput.id, updateTeacherInput);
  }

  // Mutation to delete a Teacher
  @UseGuards(JwtAuthGuard)  // Protect this mutation with JWT guard
  @Mutation(() => Boolean)
  async removeTeacher(@Args('id') id: number): Promise<boolean> {
    await this.teacherService.remove(id);
    return true;
  }
}
