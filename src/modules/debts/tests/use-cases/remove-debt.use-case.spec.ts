import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoveDebtUseCase } from '../../use-cases/remove-debt.use-case';
import { Debt } from '../../entities/debt.entity';

describe('RemoveDebtUseCase', () => {
  let useCase: RemoveDebtUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveDebtUseCase,
        {
          provide: getRepositoryToken(Debt),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<RemoveDebtUseCase>(RemoveDebtUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a debt', async () => {
    const deleteResult = { affected: 1 };
    repositoryMock.delete.mockResolvedValue(deleteResult);

    const result = await useCase.execute('1');

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleteResult);
  });
});
