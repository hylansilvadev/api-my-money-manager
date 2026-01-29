import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindCategoryByIdUseCase } from '../interfaces/find-category-by-id-use-case.interface';
import { Category } from '../entities/category.entity';

@Injectable()
export class FindCategoryByIdUseCase implements IFindCategoryByIdUseCase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async execute(id: string): Promise<Category | null> {
    return this.categoriesRepository.findOneBy({ id });
  }
}
