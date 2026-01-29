import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllRecurringUseCase } from '../../use-cases/find-all-recurring.use-case';
import { RecurringTransaction } from '../../entities/recurring.entity';

describe('FindAllRecurringUseCase', () => {
  let useCase: FindAllRecurringUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllRecurringUseCase,
        {
          provide: getRepositoryToken(RecurringTransaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindAllRecurringUseCase>(FindAllRecurringUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all recurring transactions', async () => {
    const expected = [{ id: '1', description: 'Test' }];
    repositoryMock.find.mockResolvedValue(expected);

    const result = await useCase.execute();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
