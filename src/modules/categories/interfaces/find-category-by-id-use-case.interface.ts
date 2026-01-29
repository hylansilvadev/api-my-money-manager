import { Category } from '../entities/category.entity';

export abstract class IFindCategoryByIdUseCase {
  abstract execute(id: string): Promise<Category | null>;
}
