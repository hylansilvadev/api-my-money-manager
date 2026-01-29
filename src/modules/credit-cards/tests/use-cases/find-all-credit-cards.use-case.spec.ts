import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllCreditCardsUseCase } from '../../use-cases/find-all-credit-cards.use-case';
import { CreditCard } from '../../entities/credit-card.entity';

describe('FindAllCreditCardsUseCase', () => {
  let useCase: FindAllCreditCardsUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllCreditCardsUseCase,
        {
          provide: getRepositoryToken(CreditCard),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindAllCreditCardsUseCase>(FindAllCreditCardsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all credit cards', async () => {
    const expected = [{ id: '1', name: 'Test' }];
    repositoryMock.find.mockResolvedValue(expected);

    const result = await useCase.execute();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
