import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllCreditorsUseCase } from '../../use-cases/find-all-creditors.use-case';
import { Creditor } from '../../entities/creditor.entity';

describe('FindAllCreditorsUseCase', () => {
  let useCase: FindAllCreditorsUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllCreditorsUseCase,
        {
          provide: getRepositoryToken(Creditor),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindAllCreditorsUseCase>(FindAllCreditorsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all creditors', async () => {
    const expected = [{ id: '1', name: 'Test' }];
    repositoryMock.find.mockResolvedValue(expected);

    const result = await useCase.execute();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
