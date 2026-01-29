import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllAccountsUseCase } from '../../use-cases/find-all-accounts.use-case';
import { Account } from '../../entities/account.entity';

describe('FindAllAccountsUseCase', () => {
  let useCase: FindAllAccountsUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllAccountsUseCase,
        {
          provide: getRepositoryToken(Account),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindAllAccountsUseCase>(FindAllAccountsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all accounts', async () => {
    const expected = [{ id: '1', name: 'Test' }];
    repositoryMock.find.mockResolvedValue(expected);

    const result = await useCase.execute();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
