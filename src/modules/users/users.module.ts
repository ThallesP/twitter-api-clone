import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GqlThrottlerGuard } from 'src/shared/infra/http/guards/GqlThrottlerGuard';
import { PrismaModule } from 'src/shared/infra/prisma/prisma.module';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { TwilioSMSProvider } from 'src/shared/providers/implementations/TwilioSMSProvider';
import { ISMSProvider } from 'src/shared/providers/ISMSProvider';
import { PrismaUsersRepository } from './infra/prisma/repositories/PrismaUsersRepository';
import { IUsersRepository } from './repositories/IUsersRepository';
import { LoginUserResolver } from './useCases/loginUser/LoginUserResolver';
import { LoginUserUseCase } from './useCases/loginUser/LoginUserUseCase';
import { RegisterUserResolver } from './useCases/registerUser/RegisterUserResolver';
import { RegisterUserUseCase } from './useCases/registerUser/RegisterUserUseCase';
import { VerifyUserPhoneNumberResolver } from './useCases/verifyUserPhoneNumber/VerifyUserPhoneNumberResolver';
import { VerifyUserPhoneNumberUseCase } from './useCases/verifyUserPhoneNumber/VerifyUserPhoneNumberUseCase';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  exports: [PrismaService],
  providers: [
    RegisterUserUseCase,
    VerifyUserPhoneNumberUseCase,
    LoginUserUseCase,
    PrismaService,
    {
      provide: IUsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ISMSProvider,
      useClass: TwilioSMSProvider,
    },
    RegisterUserResolver,
    VerifyUserPhoneNumberResolver,
    LoginUserResolver,
  ],
})
export class UsersModule {}
