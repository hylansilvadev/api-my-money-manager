import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoryUseCase } from '../../use-cases/create-category.use-case';
import { Category } from '../../entities/category.entity';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { CategoryType } from '../../../../enums/category-type.enum';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCategoryUseCase,
        {
          provide: getRepositoryToken(Category),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateCategoryUseCase>(CreateCategoryUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new category', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Test Category',
      icon: 'test-icon',
      color: '#fff',
      type: CategoryType.EXPENSE,
    };

    const expectedCategory = {
      id: '1',
      ...createCategoryDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repositoryMock.save.mockResolvedValue(expectedCategory);

    const result = await useCase.execute(createCategoryDto);

    expect(repositoryMock.save).toHaveBeenCalledWith(createCategoryDto);
    expect(result).toEqual(expectedCategory);
  });
});
