import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/shared/infra/prisma/prisma.module';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { PrismaUsersRepository } from './infra/prisma/repositories/PrismaUsersRepository';
import { IUsersRepository } from './repositories/IUsersRepository';
import { RegisterUserResolver } from './useCases/registerUser/RegisterUserResolver';
import { RegisterUserUseCase } from './useCases/registerUser/RegisterUserUseCase';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  exports: [PrismaService],
  providers: [
    // UseCases
    RegisterUserUseCase,

    //Services
    PrismaService,

    //Repositories
    {
      provide: IUsersRepository,
      useClass: PrismaUsersRepository,
    },

    //Resolvers
    RegisterUserResolver,
  ],
})
export class UsersModule {}
