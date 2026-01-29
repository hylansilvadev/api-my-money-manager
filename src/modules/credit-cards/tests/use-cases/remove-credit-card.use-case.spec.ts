import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoveCreditCardUseCase } from '../../use-cases/remove-credit-card.use-case';
import { CreditCard } from '../../entities/credit-card.entity';

describe('RemoveCreditCardUseCase', () => {
  let useCase: RemoveCreditCardUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveCreditCardUseCase,
        {
          provide: getRepositoryToken(CreditCard),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<RemoveCreditCardUseCase>(RemoveCreditCardUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a credit card', async () => {
    const deleteResult = { affected: 1 };
    repositoryMock.delete.mockResolvedValue(deleteResult);

    const result = await useCase.execute('1');

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleteResult);
  });
});
