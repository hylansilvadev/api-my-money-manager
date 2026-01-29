import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAccountUseCase } from '../../use-cases/create-account.use-case';
import { Account } from '../../entities/account.entity';
import { CreateAccountDto } from '../../dto/create-account.dto';
import { AccountType } from '../../../../enums/account-type.enum';

describe('CreateAccountUseCase', () => {
  let useCase: CreateAccountUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountUseCase,
        {
          provide: getRepositoryToken(Account),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateAccountUseCase>(CreateAccountUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new account', async () => {
    const createAccountDto: CreateAccountDto = {
      name: 'Test Account',
      type: AccountType.CHECKING,
      initialBalance: 100,
      color: '#000000',
      isActive: true,
    };

    const expectedAccount = {
      id: '1',
      ...createAccountDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.save.mockResolvedValue(expectedAccount);

    const result = await useCase.execute(createAccountDto);

    expect(repositoryMock.save).toHaveBeenCalledWith(createAccountDto);
    expect(result).toEqual(expectedAccount);
  });
});
