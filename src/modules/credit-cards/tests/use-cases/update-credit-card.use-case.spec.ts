import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateCreditCardUseCase } from '../../use-cases/update-credit-card.use-case';
import { CreditCard } from '../../entities/credit-card.entity';
import { UpdateCreditCardDto } from '../../dto/update-credit-card.dto';

describe('UpdateCreditCardUseCase', () => {
  let useCase: UpdateCreditCardUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCreditCardUseCase,
        {
          provide: getRepositoryToken(CreditCard),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateCreditCardUseCase>(UpdateCreditCardUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a credit card', async () => {
    const dto: UpdateCreditCardDto = { name: 'New Name' };
    const updateResult = { affected: 1 };
    repositoryMock.update.mockResolvedValue(updateResult);

    const result = await useCase.execute({ id: '1', dto });

    expect(repositoryMock.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(updateResult);
  });
});
