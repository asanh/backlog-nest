import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { UserRequestDto } from './dto/user-request.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import {UserStateEnum} from "./entities/user-state.enum";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private usersRepository: Repository<User>
  ) {
  }

  async create(data: UserRequestDto): Promise<User> {
    const user = new User();
    Object.assign(user, data);

    user.password = await bcrypt.hash(user.password, 10);

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id: id },
      relations: ['games']
    });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email: email });
  }

  async update(id: number, data: UserRequestDto) {
    const user = await this.findOne(id);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    const updatedUser = await this.usersRepository.save(user);
    updatedUser.password = null;
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (user) {
      user.state = UserStateEnum.Deleted;
      await this.usersRepository.save(user);

      return;
    }
    throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
  }
}
