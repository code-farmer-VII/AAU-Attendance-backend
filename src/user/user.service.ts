import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new User
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Find all Users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find a User by ID
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Update a User
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.save(user);
  }

  // Remove a User
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
