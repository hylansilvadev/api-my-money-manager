import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateAccountUseCase } from '../../use-cases/update-account.use-case';
import { Account } from '../../entities/account.entity';
import { UpdateAccountDto } from '../../dto/update-account.dto';

describe('UpdateAccountUseCase', () => {
  let useCase: UpdateAccountUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAccountUseCase,
        {
          provide: getRepositoryToken(Account),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateAccountUseCase>(UpdateAccountUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update an account', async () => {
    const dto: UpdateAccountDto = { name: 'New Name' };
    const updateResult = { affected: 1 };
    repositoryMock.update.mockResolvedValue(updateResult);

    const result = await useCase.execute({ id: '1', dto });

    expect(repositoryMock.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(updateResult);
  });
});
