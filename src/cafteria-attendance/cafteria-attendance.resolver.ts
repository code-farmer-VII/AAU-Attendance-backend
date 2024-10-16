import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CafeteriaAttendance } from './entities/cafteria-attendance.entity';
import { CafeteriaAttendanceService } from './cafteria-attendance.service';
import { CreateCafeteriaAttendanceDto } from './dto/create-cafteria-attendance.input';
import { UpdateCafteriaAttendanceInput } from './dto/update-cafteria-attendance.input';
import { ID } from '@nestjs/graphql';

@Resolver(() => CafeteriaAttendance)
export class CafeteriaAttendanceResolver {
  constructor(private readonly cafeteriaAttendanceService: CafeteriaAttendanceService) {}

  // Mutation to create cafeteria attendance
  @Mutation(() => CafeteriaAttendance)
  async createCafeteriaAttendance(
    @Args('createCafeteriaAttendanceDto') createCafeteriaAttendanceDto: CreateCafeteriaAttendanceDto
  ): Promise<CafeteriaAttendance> {
    return this.cafeteriaAttendanceService.create(createCafeteriaAttendanceDto);
  }

  // Query to get all cafeteria attendances
  @Query(() => [CafeteriaAttendance])
  async cafeteriaAttendances(): Promise<CafeteriaAttendance[]> {
    return this.cafeteriaAttendanceService.findAll();
  }

  // Query to get one cafeteria attendance by ID
  @Query(() => CafeteriaAttendance)
  async cafeteriaAttendance(
    @Args('id', { type: () => ID }) id: number
  ): Promise<CafeteriaAttendance> {
    return this.cafeteriaAttendanceService.findOne(id);
  }

  // Mutation to update cafeteria attendance by ID
  @Mutation(() => CafeteriaAttendance)
  async updateCafeteriaAttendance(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateCafeteriaAttendanceInput') updateCafeteriaAttendanceInput: UpdateCafteriaAttendanceInput
  ): Promise<CafeteriaAttendance> {
    return this.cafeteriaAttendanceService.update(id, updateCafeteriaAttendanceInput);
  }

  // Mutation to delete cafeteria attendance by ID
  @Mutation(() => Boolean)
  async removeCafeteriaAttendance(
    @Args('id', { type: () => ID }) id: number
  ): Promise<boolean> {
    await this.cafeteriaAttendanceService.remove(id);
    return true;
  }
}
