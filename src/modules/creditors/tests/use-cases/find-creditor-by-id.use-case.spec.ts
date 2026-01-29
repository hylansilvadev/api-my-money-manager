import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindCreditorByIdUseCase } from '../../use-cases/find-creditor-by-id.use-case';
import { Creditor } from '../../entities/creditor.entity';

describe('FindCreditorByIdUseCase', () => {
  let useCase: FindCreditorByIdUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCreditorByIdUseCase,
        {
          provide: getRepositoryToken(Creditor),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindCreditorByIdUseCase>(FindCreditorByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a creditor by id', async () => {
    const expected = { id: '1', name: 'Test' };
    repositoryMock.findOneBy.mockResolvedValue(expected);

    const result = await useCase.execute('1');

    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(expected);
  });
});
