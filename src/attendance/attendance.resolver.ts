import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtAuth.guard';
import { CurrentUser } from 'src/current-user.decorator';
@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(JwtAuthGuard)  
  @Query(() => [Attendance], { name: 'getAllAttendances' })
  async getAllAttendances(): Promise<Attendance[]> {
    return await this.attendanceService.findAll();
  }

  @UseGuards(JwtAuthGuard)  
  @Query(() => Attendance, { name: 'getAttendanceById' })
  async getAttendanceById(@Args('id', { type: () => Number }, ParseIntPipe) id: number): Promise<Attendance> {
    return await this.attendanceService.findOne(id);
  }

  // Mutation to create a new Attendance
  @UseGuards(JwtAuthGuard)  
  @Mutation(() => Attendance, { name: 'createAttendance' })
  async createAttendance(@Args('createAttendanceDto') createAttendanceDto: CreateAttendanceDto,
  @CurrentUser() user: any  
): Promise<Attendance> {
    return await this.attendanceService.create(createAttendanceDto);
  }

  // Mutation to update an existing Attendance
  @UseGuards(JwtAuthGuard)  
  @Mutation(() => Attendance, { name: 'updateAttendance' })
  async updateAttendance(
    @Args('id', { type: () => Number }, ParseIntPipe) id: number,
    @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput,
    @CurrentUser() user: any  
  ): Promise<Attendance> {
    return await this.attendanceService.update(id, updateAttendanceInput);
  }

  @UseGuards(JwtAuthGuard)  
  @Mutation(() => Boolean, { name: 'deleteAttendance' })
  async deleteAttendance(@Args('id', { type: () => Number }, ParseIntPipe) id: number): Promise<boolean> {
    await this.attendanceService.remove(id);
    return true;
  }
}
