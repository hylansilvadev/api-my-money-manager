import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllDebtsUseCase } from '../../use-cases/find-all-debts.use-case';
import { Debt } from '../../entities/debt.entity';

describe('FindAllDebtsUseCase', () => {
  let useCase: FindAllDebtsUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllDebtsUseCase,
        {
          provide: getRepositoryToken(Debt),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindAllDebtsUseCase>(FindAllDebtsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all debts', async () => {
    const expected = [{ id: '1', description: 'Test' }];
    repositoryMock.find.mockResolvedValue(expected);

    const result = await useCase.execute();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
