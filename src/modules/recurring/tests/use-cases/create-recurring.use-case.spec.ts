import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRecurringUseCase } from '../../use-cases/create-recurring.use-case';
import { RecurringTransaction } from '../../entities/recurring.entity';
import { CreateRecurringDto } from '../../dto/create-recurring.dto';
import { TransactionType } from '../../../../enums/transaction-type.enum';
import { PaymentMethod } from '../../../../enums/payment-method.enum';
import { RecurrenceFrequency } from '../../../../enums/recurrence-frequency.enum';

describe('CreateRecurringUseCase', () => {
  let useCase: CreateRecurringUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRecurringUseCase,
        {
          provide: getRepositoryToken(RecurringTransaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateRecurringUseCase>(CreateRecurringUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new recurring transaction', async () => {
    const createRecurringDto: CreateRecurringDto = {
      description: 'Netflix',
      amount: 29.9,
      type: TransactionType.EXPENSE,
      categoryId: 'cat-uuid',
      paymentMethod: PaymentMethod.CREDIT_CARD,
      frequency: RecurrenceFrequency.MONTHLY,
      dayOfMonth: 10,
      startDate: new Date(),
      isActive: true,
    };

    const expectedRecurring = {
      id: '1',
      ...createRecurringDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.save.mockResolvedValue(expectedRecurring);

    const result = await useCase.execute(createRecurringDto);

    expect(repositoryMock.save).toHaveBeenCalledWith(createRecurringDto);
    expect(result).toEqual(expectedRecurring);
  });
});
