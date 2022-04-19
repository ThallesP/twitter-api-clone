import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/modules/users/repositories/IUsersRepository';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { RegisterUserInput } from 'src/modules/users/inputs/RegisterUserInput';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create({
    name,
    password,
    phoneNumber,
  }: RegisterUserInput): Promise<User> {
    const user = await this.prismaService.user.create({
      data: { name, password, phoneNumber },
    });

    return user;
  }
}
