import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {
  IUpdateUser,
  IUsersRepository,
} from 'src/modules/users/repositories/IUsersRepository';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import { RegisterUserInput } from '../../../../../modules/users/inputs/RegisterUserInput';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prismaService: PrismaService) {}

  async update({ id, newUser }: IUpdateUser): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: { ...newUser },
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { phoneNumber } });
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return user;
  }

  async create({
    name,
    password,
    phoneNumber,
    verificationCode,
    numberVerified,
  }: RegisterUserInput): Promise<User> {
    const user = await this.prismaService.user.create({
      data: { name, password, phoneNumber, numberVerified, verificationCode },
    });

    return user;
  }
}
