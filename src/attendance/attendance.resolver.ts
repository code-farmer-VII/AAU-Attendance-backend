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

  // Query to get all Attendances
  @UseGuards(JwtAuthGuard)  // Protect this mutation with JWT guard
  @Query(() => [Attendance], { name: 'getAllAttendances' })
  async getAllAttendances(): Promise<Attendance[]> {
    return await this.attendanceService.findAll();
  }

  // Query to get a single Attendance by ID
  @UseGuards(JwtAuthGuard)  // Protect this mutation with JWT guard
  @Query(() => Attendance, { name: 'getAttendanceById' })
  async getAttendanceById(@Args('id', { type: () => Number }, ParseIntPipe) id: number): Promise<Attendance> {
    return await this.attendanceService.findOne(id);
  }

  // Mutation to create a new Attendance
  @UseGuards(JwtAuthGuard)  // Protect this mutation with JWT guard
  @Mutation(() => Attendance, { name: 'createAttendance' })
  async createAttendance(@Args('createAttendanceDto') createAttendanceDto: CreateAttendanceDto,
  @CurrentUser() user: any  // Optionally access the current authenticated user
): Promise<Attendance> {
    return await this.attendanceService.create(createAttendanceDto);
  }

  // Mutation to update an existing Attendance
  @UseGuards(JwtAuthGuard)  // Protect this mutation with JWT guard
  @Mutation(() => Attendance, { name: 'updateAttendance' })
  async updateAttendance(
    @Args('id', { type: () => Number }, ParseIntPipe) id: number,
    @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput,
    @CurrentUser() user: any  // Optionally access the current authenticated user
  ): Promise<Attendance> {
    return await this.attendanceService.update(id, updateAttendanceInput);
  }

  // Mutation to delete an Attendance by ID
  @UseGuards(JwtAuthGuard)  // Protect this mutation with JWT guard
  @Mutation(() => Boolean, { name: 'deleteAttendance' })
  async deleteAttendance(@Args('id', { type: () => Number }, ParseIntPipe) id: number): Promise<boolean> {
    await this.attendanceService.remove(id);
    return true;
  }
}
