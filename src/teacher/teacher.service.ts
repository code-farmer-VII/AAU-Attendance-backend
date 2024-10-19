import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { HttpService } from '@nestjs/axios';
import {  UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly httpService: HttpService
  ) {}

  // Create a new Teacher
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  // Fetch all Teachers
  async findAll(): Promise<Teacher[]> {
    // return this.teacherRepository.find({ relations: ['user'] });
    return this.teacherRepository.find();
  }

  // Find a Teacher by ID
  async findOne(id: number): Promise<Teacher> {
    // return this.teacherRepository.findOne({ where: { id }, relations: ['user'] });
    return this.teacherRepository.findOne({ where: { id } });
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

  async validateUser(token: string) {
    try {
      // Assuming this is your auth validation endpoint
      const response = await this.httpService
        .get('http://localhost:3000/auth/validate', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .toPromise();
      console.log(response)
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
