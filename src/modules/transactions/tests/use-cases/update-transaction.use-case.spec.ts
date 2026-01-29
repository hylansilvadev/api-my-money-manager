import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateTransactionUseCase } from '../../use-cases/update-transaction.use-case';
import { Transaction } from '../../entities/transaction.entity';
import { UpdateTransactionDto } from '../../dto/update-transaction.dto';

describe('UpdateTransactionUseCase', () => {
  let useCase: UpdateTransactionUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionUseCase,
        {
          provide: getRepositoryToken(Transaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateTransactionUseCase>(UpdateTransactionUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a transaction', async () => {
    const dto: UpdateTransactionDto = { description: 'New Description' };
    const updateResult = { affected: 1 };
    repositoryMock.update.mockResolvedValue(updateResult);

    const result = await useCase.execute({ id: '1', dto });

    expect(repositoryMock.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(updateResult);
  });
});
