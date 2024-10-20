import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CafeteriaAttendance } from './entities/cafteria-attendance.entity';
import { CafeteriaAttendanceService } from './cafteria-attendance.service';
import { CreateCafeteriaAttendanceDto } from './dto/create-cafteria-attendance.input';
import { UpdateCafteriaAttendanceInput } from './dto/update-cafteria-attendance.input';
import { ID } from '@nestjs/graphql';
import { CurrentUser } from 'src/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtAuth.guard';

@Resolver(() => CafeteriaAttendance)
export class CafeteriaAttendanceResolver {
  constructor(private readonly cafeteriaAttendanceService: CafeteriaAttendanceService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CafeteriaAttendance)
  async createCafeteriaAttendance(
    @Args('createCafeteriaAttendanceDto') createCafeteriaAttendanceDto: CreateCafeteriaAttendanceDto,
    @CurrentUser() user: any  
  ): Promise<CafeteriaAttendance> {
    return this.cafeteriaAttendanceService.create(createCafeteriaAttendanceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [CafeteriaAttendance])
  async cafeteriaAttendances(): Promise<CafeteriaAttendance[]> {
    return this.cafeteriaAttendanceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => CafeteriaAttendance)
  async cafeteriaAttendance(
    @Args('id', { type: () => ID }) id: number
  ): Promise<CafeteriaAttendance> {
    return this.cafeteriaAttendanceService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CafeteriaAttendance)
  async updateCafeteriaAttendance(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateCafeteriaAttendanceInput') updateCafeteriaAttendanceInput: UpdateCafteriaAttendanceInput,
    @CurrentUser() user: any  
  ): Promise<CafeteriaAttendance> {
    return this.cafeteriaAttendanceService.update(id, updateCafeteriaAttendanceInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeCafeteriaAttendance(
    @Args('id', { type: () => ID }) id: number
  ): Promise<boolean> {
    await this.cafeteriaAttendanceService.remove(id);
    return true;
  }
}
