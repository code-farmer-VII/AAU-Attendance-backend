import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { Student } from 'src/student/entities/student.entity'; // Import Student entity
import { Teacher } from 'src/teacher/entities/teacher.entity'; // Import Teacher entity
import { CreateAttendanceDto } from './dto/create-attendance.input';
import { UpdateAttendanceInput } from './dto/update-attendance.input';
import { NotFoundException } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';


@Injectable()
export class AttendanceService {
  private client: ClientProxy;
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>, // Inject Student repository
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>, // Inject Teacher repository
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue', // Send token verification request to Auth Service
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  // Create Attendance
  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const { studentId, teacherId, attendanceDate, attendanceTime, status } = createAttendanceDto;

    // Check if the student exists
    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {

      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    // Check if the teacher exists
    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    // Create the attendance record and link student and teacher
    const attendance = this.attendanceRepository.create({
      student,
      teacher,
      attendanceDate,
      attendanceTime,
      status,
    });

    return await this.attendanceRepository.save(attendance);
  }

  // Get All Attendances
  async findAll(): Promise<Attendance[]> {
    return await this.attendanceRepository.find({ relations: ['student', 'teacher'] });
  }

  // Get Attendance by ID
  async findOne(id: number): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['student', 'teacher'],
    });

    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }

    return attendance;
  }

  // Update Attendance
  async update(id: number, updateAttendanceInput: UpdateAttendanceInput): Promise<Attendance> {
    const attendance = await this.findOne(id); // Ensures the attendance exists

    // Update fields
    const updatedAttendance = Object.assign(attendance, updateAttendanceInput);

    return await this.attendanceRepository.save(updatedAttendance);
  }

  // Delete Attendance
  async remove(id: number): Promise<void> {
    const attendance = await this.findOne(id); // Ensures the attendance exists
    await this.attendanceRepository.remove(attendance);
  }

  async checkAttendance(token: string) {
    const isValidToken = await this.client.send<boolean>('verify_token', { token }).toPromise();
      // Token is valid, process attendance check-in or check-out
    if (isValidToken) {
      return isValidToken;
    } else {
      // Invalid token, reject attendance
      throw new UnauthorizedException('Invalid token');

    }
  }
}
