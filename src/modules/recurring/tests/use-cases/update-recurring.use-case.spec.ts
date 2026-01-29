import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateRecurringUseCase } from '../../use-cases/update-recurring.use-case';
import { RecurringTransaction } from '../../entities/recurring.entity';
import { UpdateRecurringDto } from '../../dto/update-recurring.dto';

describe('UpdateRecurringUseCase', () => {
  let useCase: UpdateRecurringUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateRecurringUseCase,
        {
          provide: getRepositoryToken(RecurringTransaction),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateRecurringUseCase>(UpdateRecurringUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a recurring transaction', async () => {
    const dto: UpdateRecurringDto = { description: 'New Description' };
    const updateResult = { affected: 1 };
    repositoryMock.update.mockResolvedValue(updateResult);

    const result = await useCase.execute({ id: '1', dto });

    expect(repositoryMock.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(updateResult);
  });
});
