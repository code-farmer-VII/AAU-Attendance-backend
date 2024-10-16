import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Mutation to create a new User
  @Mutation(() => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // Query to get all Users
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Query to get a User by ID
  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // Mutation to update a User
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  // Mutation to delete a User
  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: number): Promise<boolean> {
    await this.userService.remove(id);
    return true;
  }
}
