import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindRecurringByIdUseCase } from '../../use-cases/find-recurring-by-id.use-case';
import { RecurringTransaction } from '../../entities/recurring.entity';

describe('FindRecurringByIdUseCase', () => {
  let useCase: FindRecurringByIdUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindRecurringByIdUseCase,
        {
          provide: getRepositoryToken(RecurringTransaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindRecurringByIdUseCase>(FindRecurringByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a recurring transaction by id', async () => {
    const expected = { id: '1', description: 'Test' };
    repositoryMock.findOne.mockResolvedValue(expected);

    const result = await useCase.execute('1');

    expect(repositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['category', 'bankAccount', 'card'],
    });
    expect(result).toEqual(expected);
  });
});
