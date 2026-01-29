import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateCategoryUseCase } from '../../use-cases/update-category.use-case';
import { Category } from '../../entities/category.entity';
import { UpdateCategoryDto } from '../../dto/update-category.dto';

describe('UpdateCategoryUseCase', () => {
  let useCase: UpdateCategoryUseCase;
  let repositoryMock: any;

  beforeEach(async () => {
    repositoryMock = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCategoryUseCase,
        {
          provide: getRepositoryToken(Category),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<UpdateCategoryUseCase>(UpdateCategoryUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a category', async () => {
    const dto: UpdateCategoryDto = { name: 'New Name' };
    const updateResult = { affected: 1 };
    repositoryMock.update.mockResolvedValue(updateResult);

    const result = await useCase.execute({ id: '1', dto });

    expect(repositoryMock.update).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(updateResult);
  });
});
