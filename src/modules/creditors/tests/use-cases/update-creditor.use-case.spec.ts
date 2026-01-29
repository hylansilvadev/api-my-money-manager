import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateCreditorUseCase } from '../../use-cases/update-creditor.use-case';
import { Creditor } from '../../entities/creditor.entity';
import { UpdateCreditorDto } from '../../dto/update-creditor.dto';

describe('UpdateCreditorUseCase', () => {
  let useCase: UpdateCreditorUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCreditorUseCase,
        {
          provide: getRepositoryToken(Creditor),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateCreditorUseCase>(UpdateCreditorUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a creditor', async () => {
    const dto: UpdateCreditorDto = { name: 'New Name' };
    const updateResult = { affected: 1 };
    repositoryMock.update.mockResolvedValue(updateResult);

    const result = await useCase.execute({ id: '1', dto });

    expect(repositoryMock.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(updateResult);
  });
});
