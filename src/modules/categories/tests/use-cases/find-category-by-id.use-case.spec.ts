import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindCategoryByIdUseCase } from '../../use-cases/find-category-by-id.use-case';
import { Category } from '../../entities/category.entity';

describe('FindCategoryByIdUseCase', () => {
  let useCase: FindCategoryByIdUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCategoryByIdUseCase,
        {
          provide: getRepositoryToken(Category),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<FindCategoryByIdUseCase>(FindCategoryByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return a category by id', async () => {
    const expected = { id: '1', name: 'Test' };
    repositoryMock.findOneBy.mockResolvedValue(expected);

    const result = await useCase.execute('1');

    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual(expected);
  });
});
