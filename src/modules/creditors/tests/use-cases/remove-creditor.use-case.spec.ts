import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoveCreditorUseCase } from '../../use-cases/remove-creditor.use-case';
import { Creditor } from '../../entities/creditor.entity';

describe('RemoveCreditorUseCase', () => {
  let useCase: RemoveCreditorUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveCreditorUseCase,
        {
          provide: getRepositoryToken(Creditor),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<RemoveCreditorUseCase>(RemoveCreditorUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a creditor', async () => {
    const deleteResult = { affected: 1 };
    repositoryMock.delete.mockResolvedValue(deleteResult);

    const result = await useCase.execute('1');

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual(deleteResult);
  });
});
