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

  @UseGuards(JwtAuthGuard)  
  @Mutation(() => Teacher)
  async createTeacher(
    @Args('createTeacherDto') createTeacherDto: CreateTeacherDto,
    @CurrentUser() user: any  
  ): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  @UseGuards(JwtAuthGuard)  
  @Query(() => [Teacher], { name: 'teachers' })
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @UseGuards(JwtAuthGuard)  
  @Query(() => Teacher, { name: 'teacher' })
  async findOne(@Args('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)  
  @Mutation(() => Teacher)
  async updateTeacher(
    @Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput,
    @CurrentUser() user: any  
  ): Promise<Teacher> {
    return this.teacherService.update(updateTeacherInput.id, updateTeacherInput);
  }

  // Mutation to delete a Teacher
  @UseGuards(JwtAuthGuard)  
  @Mutation(() => Boolean)
  async removeTeacher(@Args('id') id: number): Promise<boolean> {
    await this.teacherService.remove(id);
    return true;
  }
}
