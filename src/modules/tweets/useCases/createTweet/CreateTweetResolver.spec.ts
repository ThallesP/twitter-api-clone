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

describe('CreateTweetResolver', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '' }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          context: ({ req, res }) => ({ req, res }),
        }),
      ],
      providers: [
        CreateTweetResolver,
        CreateTweetUseCase,
        { provide: ITweetsRepository, useValue: PrismaTweetsRepository },
      ],
    }).compile();

    app = testingModule.createNestApplication();
  });

  it('should create tweet', async () => {
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: 'createTweet',
        query: createTweetMutationFactory('e2e test'),
      })
      .expect({ data: { createTweet: { text: 'e2e test' } } });
  });
});
