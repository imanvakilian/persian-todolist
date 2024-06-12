import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictMessage, NotFoundMessage } from 'src/common/messages/public.message';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) { }
  async create(registerDto: RegisterDto) {
    await this.checkExistByMobile(registerDto.mobile);
    const user = this.userRepository.create(registerDto);
    await this.userRepository.save(user);
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(NotFoundMessage.user);
    return user;
  }

  async findOneByMobile(mobile: string) {
    const user = await this.userRepository.findOneBy({ mobile });
    if (!user) throw new NotFoundException(NotFoundMessage.user);
    return user;
  }

  async checkExistByMobile(mobile: string) {
    const user = await this.userRepository.findOneBy({ mobile });
    if (user) throw new ConflictException(ConflictMessage.user);
    return null;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
