import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { join } from 'path';
import { createTweetMutationFactory } from '../../../../shared/testing/graphql/CreateTweetMutationFactory';
import request from 'supertest';
import { PrismaTweetsRepository } from '../../infra/prisma/repositories/PrismaTweetsRepository';
import { ITweetsRepository } from '../../repositories/ITweetsRepository';
import { CreateTweetResolver } from './CreateTweetResolver';
import { CreateTweetUseCase } from './CreateTweetUseCase';
import { ConfigModule } from '@nestjs/config';
import { DummyQueryResolver } from '../../../../shared/infra/graphql/DummyQueryResolver';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';
import { sign } from 'jsonwebtoken';

describe('CreateTweetResolver', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let accessToken: string;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: `${process.cwd()}/.env.test` }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          context: ({ req, res }) => ({ req, res }),
        }),
      ],
      providers: [
        DummyQueryResolver,
        { provide: ITweetsRepository, useValue: PrismaTweetsRepository },
        CreateTweetResolver,
        CreateTweetUseCase,
        PrismaService,
      ],
    }).compile();

    app = testingModule.createNestApplication();
    prismaService = testingModule.get<PrismaService>(PrismaService);
    const { numberVerified, phoneNumber, id } = await prismaService.user.upsert(
      {
        where: { phoneNumber: '+5511999999999' },
        create: {
          name: 'e2e user',
          phoneNumber: '+5511999999999',
          numberVerified: true,
          password: '123456',
        },
        update: {},
      },
    );

    accessToken = sign(
      { numberVerified, phoneNumber },
      process.env.JWT_SECRET,
      { subject: id },
    );
    await app.init();
  });

  it('should create tweet', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        operationName: null,
        query: createTweetMutationFactory('e2e test'),
        variables: {},
      });

    console.log(response);
  });
});
