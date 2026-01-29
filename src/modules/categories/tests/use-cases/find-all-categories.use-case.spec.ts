import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindAllCategoriesUseCase } from '../../use-cases/find-all-categories.use-case';
import { Category } from '../../entities/category.entity';

describe('FindAllCategoriesUseCase', () => {
  let useCase: FindAllCategoriesUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllCategoriesUseCase,
        {
          provide: getRepositoryToken(Category),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindAllCategoriesUseCase>(FindAllCategoriesUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all categories', async () => {
    const expected = [{ id: '1', name: 'Test' }];
    repositoryMock.find.mockResolvedValue(expected);

    const result = await useCase.execute();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
