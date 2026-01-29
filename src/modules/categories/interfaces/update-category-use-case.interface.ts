import { UpdateResult } from 'typeorm';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export abstract class IUpdateCategoryUseCase {
  abstract execute(params: {
    id: string;
    dto: UpdateCategoryDto;
  }): Promise<UpdateResult>;
}
