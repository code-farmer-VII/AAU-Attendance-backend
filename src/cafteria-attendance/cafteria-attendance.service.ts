import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CafeteriaAttendance } from './entities/cafteria-attendance.entity';
import { CreateCafeteriaAttendanceDto } from './dto/create-cafteria-attendance.input';
import { UpdateCafteriaAttendanceInput } from './dto/update-cafteria-attendance.input';
import { Student } from 'src/student/entities/student.entity';


@Injectable()
export class CafeteriaAttendanceService {
  constructor(
    @InjectRepository(CafeteriaAttendance)
    private readonly cafeteriaAttendanceRepository: Repository<CafeteriaAttendance>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  // Create a new CafeteriaAttendance record
  async create(createCafeteriaAttendanceDto: CreateCafeteriaAttendanceDto): Promise<CafeteriaAttendance> {
    const { studentId, mealTime, attendanceDate, attendanceTime } = createCafeteriaAttendanceDto;

    // Check if the student exists
    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new Error('Student not found');
    }

    const cafeteriaAttendance = this.cafeteriaAttendanceRepository.create({
      student,
      mealTime,
      attendanceDate,
      attendanceTime,
    });

    return this.cafeteriaAttendanceRepository.save(cafeteriaAttendance);
  }

  // Find all CafeteriaAttendance records
  async findAll(): Promise<CafeteriaAttendance[]> {
    return this.cafeteriaAttendanceRepository.find({ relations: ['student'] });
  }

  // Find a specific CafeteriaAttendance record by ID
  async findOne(id: number): Promise<CafeteriaAttendance> {
    const cafeteriaAttendance = await this.cafeteriaAttendanceRepository.findOne({
      where: { id },
      relations: ['student'],
    });
    
    if (!cafeteriaAttendance) {
      throw new Error('Cafeteria Attendance not found');
    }
    
    return cafeteriaAttendance;
  }

  // Update a specific CafeteriaAttendance record by ID
  async update(id: number, updateCafeteriaAttendanceDto: UpdateCafteriaAttendanceInput): Promise<CafeteriaAttendance> {
    const cafeteriaAttendance = await this.findOne(id);

    // Check and update fields
    if (updateCafeteriaAttendanceDto.mealTime) {
      cafeteriaAttendance.mealTime = updateCafeteriaAttendanceDto.mealTime;
    }
    if (updateCafeteriaAttendanceDto.attendanceDate) {
      cafeteriaAttendance.attendanceDate = updateCafeteriaAttendanceDto.attendanceDate;
    }
    if (updateCafeteriaAttendanceDto.attendanceTime) {
      cafeteriaAttendance.attendanceTime = updateCafeteriaAttendanceDto.attendanceTime;
    }

    return this.cafeteriaAttendanceRepository.save(cafeteriaAttendance);
  }

  // Delete a CafeteriaAttendance record by ID
  async remove(id: number): Promise<void> {
    const cafeteriaAttendance = await this.findOne(id);
    await this.cafeteriaAttendanceRepository.remove(cafeteriaAttendance);
  }
}
