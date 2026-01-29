import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindCreditCardByIdUseCase } from '../../use-cases/find-credit-card-by-id.use-case';
import { CreditCard } from '../../entities/credit-card.entity';

describe('FindCreditCardByIdUseCase', () => {
  let useCase: FindCreditCardByIdUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCreditCardByIdUseCase,
        {
          provide: getRepositoryToken(CreditCard),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindCreditCardByIdUseCase>(FindCreditCardByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a credit card by id', async () => {
    const expected = { id: '1', name: 'Test' };
    repositoryMock.findOne.mockResolvedValue(expected);

    const result = await useCase.execute('1');

    expect(repositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['bankAccount'],
    });
    expect(result).toEqual(expected);
  });
});
