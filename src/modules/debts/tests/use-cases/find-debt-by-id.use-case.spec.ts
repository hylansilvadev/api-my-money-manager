import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindDebtByIdUseCase } from '../../use-cases/find-debt-by-id.use-case';
import { Debt } from '../../entities/debt.entity';

describe('FindDebtByIdUseCase', () => {
  let useCase: FindDebtByIdUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindDebtByIdUseCase,
        {
          provide: getRepositoryToken(Debt),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindDebtByIdUseCase>(FindDebtByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a debt by id', async () => {
    const expected = { id: '1', description: 'Test' };
    repositoryMock.findOne.mockResolvedValue(expected);

    const result = await useCase.execute('1');

    expect(repositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['creditor'],
    });
    expect(result).toEqual(expected);
  });
});
