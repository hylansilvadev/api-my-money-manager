import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllTransactionsUseCase } from '../../use-cases/find-all-transactions.use-case';
import { Transaction } from '../../entities/transaction.entity';

describe('FindAllTransactionsUseCase', () => {
  let useCase: FindAllTransactionsUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTransactionsUseCase,
        {
          provide: getRepositoryToken(Transaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindAllTransactionsUseCase>(
      FindAllTransactionsUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all transactions', async () => {
    const expected = [{ id: '1', description: 'Test' }];
    repositoryMock.find.mockResolvedValue(expected);

    const result = await useCase.execute();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
