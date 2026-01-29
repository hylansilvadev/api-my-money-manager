import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../categories.controller';
import { ICreateCategoryUseCase } from '../../interfaces/create-category-use-case.interface';
import { IFindAllCategoriesUseCase } from '../../interfaces/find-all-categories-use-case.interface';
import { IFindCategoryByIdUseCase } from '../../interfaces/find-category-by-id-use-case.interface';
import { IUpdateCategoryUseCase } from '../../interfaces/update-category-use-case.interface';
import { IRemoveCategoryUseCase } from '../../interfaces/remove-category-use-case.interface';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { CategoryType } from '../../../../enums/category-type.enum';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let createCategoryUseCase: any;
  let findAllCategoriesUseCase: any;
  let findCategoryByIdUseCase: any;
  let updateCategoryUseCase: any;
  let removeCategoryUseCase: any;

  beforeEach(async () => {
    createCategoryUseCase = { execute: jest.fn() };
    findAllCategoriesUseCase = { execute: jest.fn() };
    findCategoryByIdUseCase = { execute: jest.fn() };
    updateCategoryUseCase = { execute: jest.fn() };
    removeCategoryUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: ICreateCategoryUseCase, useValue: createCategoryUseCase },
        {
          provide: IFindAllCategoriesUseCase,
          useValue: findAllCategoriesUseCase,
        },
        {
          provide: IFindCategoryByIdUseCase,
          useValue: findCategoryByIdUseCase,
        },
        { provide: IUpdateCategoryUseCase, useValue: updateCategoryUseCase },
        { provide: IRemoveCategoryUseCase, useValue: removeCategoryUseCase },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto: CreateCategoryDto = {
        name: 'Test Category',
        icon: 'test-icon',
        color: '#fff',
        type: CategoryType.EXPENSE,
      };

      const result = { id: '1', ...dto };
      createCategoryUseCase.execute.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(createCategoryUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [{ id: '1', name: 'Category' }];
      findAllCategoriesUseCase.execute.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(findAllCategoriesUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const result = { id: '1', name: 'Category' };
      findCategoryByIdUseCase.execute.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(findCategoryByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const dto: UpdateCategoryDto = { name: 'Updated' };
      const result = { id: '1', name: 'Updated' };
      updateCategoryUseCase.execute.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(updateCategoryUseCase.execute).toHaveBeenCalledWith({
        id: '1',
        dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      removeCategoryUseCase.execute.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBe(undefined);
      expect(removeCategoryUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
