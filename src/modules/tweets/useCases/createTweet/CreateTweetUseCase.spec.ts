import { Test } from '@nestjs/testing';
import { ITweetsRepository } from '../../repositories/ITweetsRepository';
import { TweetsRepositoryInMemory } from '../../repositories/in-memory/TweetsRepositoryInMemory';
import { CreateTweetUseCase } from './CreateTweetUseCase';
import { v4 as uuidV4 } from 'uuid';

describe('CreateTweetUseCase', () => {
  let createTweetUseCase: CreateTweetUseCase;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ITweetsRepository,
          useClass: TweetsRepositoryInMemory,
        },
        CreateTweetUseCase,
      ],
    }).compile();

    createTweetUseCase = testingModule.get(CreateTweetUseCase);
  });

  it('should create tweet', async () => {
    const authorId = uuidV4();
    const sut = await createTweetUseCase.execute({
      text: 'Test',
      authorId,
    });

    expect(sut.text).toBe('Test');
    expect(sut.authorId).toBe(authorId);
  });
});
