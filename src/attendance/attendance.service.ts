import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { Student } from 'src/student/entities/student.entity'; 
import { Teacher } from 'src/teacher/entities/teacher.entity'; 
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
    private readonly studentRepository: Repository<Student>, 
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>, 
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue', 
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const { studentId, teacherId, attendanceDate, attendanceTime, status } = createAttendanceDto;

    const student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {

      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    const attendance = this.attendanceRepository.create({
      student,
      teacher,
      attendanceDate,
      attendanceTime,
      status,
    });

    return await this.attendanceRepository.save(attendance);
  }

  async findAll(): Promise<Attendance[]> {
    return await this.attendanceRepository.find({ relations: ['student', 'teacher'] });
  }

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

  async update(id: number, updateAttendanceInput: UpdateAttendanceInput): Promise<Attendance> {
    const attendance = await this.findOne(id); 

    const updatedAttendance = Object.assign(attendance, updateAttendanceInput);

    return await this.attendanceRepository.save(updatedAttendance);
  }

  async remove(id: number): Promise<void> {
    const attendance = await this.findOne(id); 
    await this.attendanceRepository.remove(attendance);
  }

  async checkAttendance(token: string) {
    const isValidToken = await this.client.send<boolean>('verify_token', { token }).toPromise();
    if (isValidToken) {
      return isValidToken;
    } else {
      throw new UnauthorizedException('Invalid token');

    }
  }
}
