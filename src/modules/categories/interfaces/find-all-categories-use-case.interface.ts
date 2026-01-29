import { Category } from '../entities/category.entity';

export abstract class IFindAllCategoriesUseCase {
  abstract execute(): Promise<Category[]>;
}
