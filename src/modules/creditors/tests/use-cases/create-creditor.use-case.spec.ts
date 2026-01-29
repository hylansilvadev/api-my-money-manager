import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCreditorUseCase } from '../../use-cases/create-creditor.use-case';
import { Creditor } from '../../entities/creditor.entity';
import { CreateCreditorDto } from '../../dto/create-creditor.dto';

describe('CreateCreditorUseCase', () => {
  let useCase: CreateCreditorUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCreditorUseCase,
        {
          provide: getRepositoryToken(Creditor),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateCreditorUseCase>(CreateCreditorUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new creditor', async () => {
    const createCreditorDto: CreateCreditorDto = {
      name: 'Test Creditor',
      description: 'Test Description',
      phone: '123456789',
    };

    const expectedCreditor = {
      id: '1',
      ...createCreditorDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.save.mockResolvedValue(expectedCreditor);

    const result = await useCase.execute(createCreditorDto);

    expect(repositoryMock.save).toHaveBeenCalledWith(createCreditorDto);
    expect(result).toEqual(expectedCreditor);
  });
});
