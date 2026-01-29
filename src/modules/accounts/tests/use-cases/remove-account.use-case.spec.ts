import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoveAccountUseCase } from '../../use-cases/remove-account.use-case';
import { Account } from '../../entities/account.entity';

describe('RemoveAccountUseCase', () => {
  let useCase: RemoveAccountUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveAccountUseCase,
        {
          provide: getRepositoryToken(Account),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<RemoveAccountUseCase>(RemoveAccountUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete an account', async () => {
    const deleteResult = { affected: 1 };
    repositoryMock.delete.mockResolvedValue(deleteResult);

    const result = await useCase.execute('1');

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleteResult);
  });
});
