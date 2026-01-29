import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateDebtUseCase } from '../../use-cases/update-debt.use-case';
import { Debt } from '../../entities/debt.entity';
import { UpdateDebtDto } from '../../dto/update-debt.dto';

describe('UpdateDebtUseCase', () => {
  let useCase: UpdateDebtUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateDebtUseCase,
        {
          provide: getRepositoryToken(Debt),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateDebtUseCase>(UpdateDebtUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a debt', async () => {
    const dto: UpdateDebtDto = { description: 'New Description' };
    const updateResult = { affected: 1 };
    repositoryMock.update.mockResolvedValue(updateResult);

    const result = await useCase.execute({ id: '1', dto });

    expect(repositoryMock.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(updateResult);
  });
});
