import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { LoginDto } from './dto/login-user.dto';
import { BAD_REQUEST, NOTFOUND } from 'src/utils/response';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepo.findOne({ where: { name: createUserDto.name}})
    if (existingUser) 
      throw BAD_REQUEST([], "User already exists")
    const user: User = this.userRepo.create(createUserDto)
    await this.userRepo.save(user)
    return user
  }

  async loginUser(loginUserDto: LoginDto) {
    const user: User = await this.userRepo.findOne({ where: { name: loginUserDto.name}})
    if (!user) 
      throw NOTFOUND([], "Invalid credentials")
    const isValid: boolean = await user.comparePassword(loginUserDto.password)
    if (!isValid)
      throw NOTFOUND([], 'Invalid credentials')

    const payload = {
      id: user.id,
      name: user.name,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      user: user
    };
  }

  async findUser(
    where: FindOptionsWhere<User>,
    relations?: string[],
  ): Promise<User | null> {
    return this.userRepo.findOne({
      where,
      relations,
    });
  }
}
