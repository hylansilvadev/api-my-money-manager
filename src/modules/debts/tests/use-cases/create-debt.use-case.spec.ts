import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDebtUseCase } from '../../use-cases/create-debt.use-case';
import { Debt } from '../../entities/debt.entity';
import { CreateDebtDto } from '../../dto/create-debt.dto';
import { DebtStatus } from '../../../../enums/debt-status.enum';

describe('CreateDebtUseCase', () => {
  let useCase: CreateDebtUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDebtUseCase,
        {
          provide: getRepositoryToken(Debt),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateDebtUseCase>(CreateDebtUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new debt', async () => {
    const createDebtDto: CreateDebtDto = {
      creditorId: 'uuid',
      description: 'Test Debt',
      totalAmount: 100,
      remainingAmount: 100,
      dueDate: new Date(),
      status: DebtStatus.PENDING,
    };

    const expectedDebt = {
      id: '1',
      ...createDebtDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.save.mockResolvedValue(expectedDebt);

    const result = await useCase.execute(createDebtDto);

    expect(repositoryMock.save).toHaveBeenCalledWith(createDebtDto);
    expect(result).toEqual(expectedDebt);
  });
});
