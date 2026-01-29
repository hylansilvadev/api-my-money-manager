import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTransactionUseCase } from '../../use-cases/create-transaction.use-case';
import { Transaction } from '../../entities/transaction.entity';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { TransactionType } from '../../../../enums/transaction-type.enum';
import { PaymentMethod } from '../../../../enums/payment-method.enum';
import { TransactionStatus } from '../../../../enums/transaction-status.enum';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionUseCase,
        {
          provide: getRepositoryToken(Transaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateTransactionUseCase>(CreateTransactionUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new transaction', async () => {
    const createTransactionDto: CreateTransactionDto = {
      description: 'Lunch',
      amount: 25.0,
      date: new Date(),
      type: TransactionType.EXPENSE,
      categoryId: 'cat-uuid',
      paymentMethod: PaymentMethod.CASH,
      status: TransactionStatus.PAID,
    };

    const expectedTransaction = {
      id: '1',
      ...createTransactionDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.save.mockResolvedValue(expectedTransaction);

    const result = await useCase.execute(createTransactionDto);

    expect(repositoryMock.save).toHaveBeenCalledWith(createTransactionDto);
    expect(result).toEqual(expectedTransaction);
  });
});
