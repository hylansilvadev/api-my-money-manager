import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoveRecurringUseCase } from '../../use-cases/remove-recurring.use-case';
import { RecurringTransaction } from '../../entities/recurring.entity';

describe('RemoveRecurringUseCase', () => {
  let useCase: RemoveRecurringUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveRecurringUseCase,
        {
          provide: getRepositoryToken(RecurringTransaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<RemoveRecurringUseCase>(RemoveRecurringUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a recurring transaction', async () => {
    const deleteResult = { affected: 1 };
    repositoryMock.delete.mockResolvedValue(deleteResult);

    const result = await useCase.execute('1');

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleteResult);
  });
});
