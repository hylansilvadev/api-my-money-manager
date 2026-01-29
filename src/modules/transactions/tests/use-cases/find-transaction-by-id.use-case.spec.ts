import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindTransactionByIdUseCase } from '../../use-cases/find-transaction-by-id.use-case';
import { Transaction } from '../../entities/transaction.entity';

describe('FindTransactionByIdUseCase', () => {
  let useCase: FindTransactionByIdUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindTransactionByIdUseCase,
        {
          provide: getRepositoryToken(Transaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindTransactionByIdUseCase>(
      FindTransactionByIdUseCase,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a transaction by id', async () => {
    const expected = { id: '1', description: 'Test' };
    repositoryMock.findOne.mockResolvedValue(expected);

    const result = await useCase.execute('1');

    expect(repositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['category', 'bankAccount', 'card', 'recurring'],
    });
    expect(result).toEqual(expected);
  });
});
