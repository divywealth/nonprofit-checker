import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { CREATED, OK } from 'src/utils/response';
import { ISuccessResponse } from 'src/interface/response.interface';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ISuccessResponse<User>> {
    const response = await this.userService.create(createUserDto);
    return CREATED(response, "User created successfully")
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto): Promise<ISuccessResponse<User>>  {
    const response = await this.userService.loginUser(loginDto)
    return OK(response, "Signed in successfully")
  }
}
