import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAccountByIdUseCase } from '../../use-cases/find-account-by-id.use-case';
import { Account } from '../../entities/account.entity';

describe('FindAccountByIdUseCase', () => {
  let useCase: FindAccountByIdUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAccountByIdUseCase,
        {
          provide: getRepositoryToken(Account),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindAccountByIdUseCase>(FindAccountByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return an account by id', async () => {
    const expected = { id: '1', name: 'Test' };
    repositoryMock.findOneBy.mockResolvedValue(expected);

    const result = await useCase.execute('1');

    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(expected);
  });
});
