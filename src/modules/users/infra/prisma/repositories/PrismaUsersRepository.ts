import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/modules/users/repositories/IUsersRepository';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { RegisterUserInput } from 'src/modules/users/inputs/RegisterUserInput';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prismaService: PrismaService) {}

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
