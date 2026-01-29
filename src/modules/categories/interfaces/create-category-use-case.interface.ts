import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

export abstract class ICreateCategoryUseCase {
  abstract execute(createCategoryDto: CreateCategoryDto): Promise<Category>;
}
