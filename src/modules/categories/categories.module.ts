import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { CreateCategoryUseCase } from './use-cases/create-category.use-case';
import { FindAllCategoriesUseCase } from './use-cases/find-all-categories.use-case';
import { FindCategoryByIdUseCase } from './use-cases/find-category-by-id.use-case';
import { UpdateCategoryUseCase } from './use-cases/update-category.use-case';
import { RemoveCategoryUseCase } from './use-cases/remove-category.use-case';
import { ICreateCategoryUseCase } from './interfaces/create-category-use-case.interface';
import { IFindAllCategoriesUseCase } from './interfaces/find-all-categories-use-case.interface';
import { IFindCategoryByIdUseCase } from './interfaces/find-category-by-id-use-case.interface';
import { IUpdateCategoryUseCase } from './interfaces/update-category-use-case.interface';
import { IRemoveCategoryUseCase } from './interfaces/remove-category-use-case.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: ICreateCategoryUseCase,
      useClass: CreateCategoryUseCase,
    },
    {
      provide: IFindAllCategoriesUseCase,
      useClass: FindAllCategoriesUseCase,
    },
    {
      provide: IFindCategoryByIdUseCase,
      useClass: FindCategoryByIdUseCase,
    },
    {
      provide: IUpdateCategoryUseCase,
      useClass: UpdateCategoryUseCase,
    },
    {
      provide: IRemoveCategoryUseCase,
      useClass: RemoveCategoryUseCase,
    },
  ],
})
export class CategoriesModule {}
