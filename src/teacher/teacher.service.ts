import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  // Create a new Teacher
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  // Fetch all Teachers
  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({ relations: ['user'] });
  }

  // Find a Teacher by ID
  async findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({ where: { id }, relations: ['user'] });
  }

  // Update a Teacher
  async update(id: number, updateTeacherInput: UpdateTeacherInput): Promise<Teacher> {
    const teacher = await this.teacherRepository.preload({
      id,
      ...updateTeacherInput,
    });

    if (!teacher) {
      throw new Error('Teacher not found');
    }

    return this.teacherRepository.save(teacher);
  }

  // Remove a Teacher
  async remove(id: number): Promise<void> {
    const teacher = await this.findOne(id);
    await this.teacherRepository.remove(teacher);
  }
}
