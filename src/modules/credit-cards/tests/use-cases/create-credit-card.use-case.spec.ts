import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCreditCardUseCase } from '../../use-cases/create-credit-card.use-case';
import { CreditCard } from '../../entities/credit-card.entity';
import { CreateCreditCardDto } from '../../dto/create-credit-card.dto';
import { CardBrand } from '../../../../enums/card-brand.enum';

describe('CreateCreditCardUseCase', () => {
  let useCase: CreateCreditCardUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCreditCardUseCase,
        {
          provide: getRepositoryToken(CreditCard),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateCreditCardUseCase>(CreateCreditCardUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new credit card', async () => {
    const createCreditCardDto: CreateCreditCardDto = {
      name: 'Test Card',
      lastDigits: '1234',
      limit: 1000,
      closingDay: 5,
      dueDay: 10,
      color: '#fff',
      brand: CardBrand.VISA,
      isActive: true,
    };

    const expectedCreditCard = {
      id: '1',
      ...createCreditCardDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.save.mockResolvedValue(expectedCreditCard);

    const result = await useCase.execute(createCreditCardDto);

    expect(repositoryMock.save).toHaveBeenCalledWith(createCreditCardDto);
    expect(result).toEqual(expectedCreditCard);
  });
});
