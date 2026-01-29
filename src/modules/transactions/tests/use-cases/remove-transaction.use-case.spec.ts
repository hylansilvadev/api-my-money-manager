import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoveTransactionUseCase } from '../../use-cases/remove-transaction.use-case';
import { Transaction } from '../../entities/transaction.entity';

describe('RemoveTransactionUseCase', () => {
  let useCase: RemoveTransactionUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveTransactionUseCase,
        {
          provide: getRepositoryToken(Transaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<RemoveTransactionUseCase>(RemoveTransactionUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a transaction', async () => {
    const deleteResult = { affected: 1 };
    repositoryMock.delete.mockResolvedValue(deleteResult);

    const result = await useCase.execute('1');

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleteResult);
  });
});
