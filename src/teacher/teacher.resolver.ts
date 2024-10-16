import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  // Mutation to create a new Teacher
  @Mutation(() => Teacher)
  async createTeacher(@Args('createTeacherDto') createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  // Query to get all Teachers
  @Query(() => [Teacher], { name: 'teachers' })
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  // Query to get a Teacher by ID
  @Query(() => Teacher, { name: 'teacher' })
  async findOne(@Args('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  // Mutation to update a Teacher
  @Mutation(() => Teacher)
  async updateTeacher(
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
  ): Promise<Teacher> {
    return this.teacherService.update(updateTeacherInput.id, updateTeacherInput);
  }

  // Mutation to delete a Teacher
  @Mutation(() => Boolean)
  async removeTeacher(@Args('id') id: number): Promise<boolean> {
    await this.teacherService.remove(id);
    return true;
  }
}
