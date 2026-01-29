import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAllCategoriesUseCase } from '../interfaces/find-all-categories-use-case.interface';
import { Category } from '../entities/category.entity';

@Injectable()
export class FindAllCategoriesUseCase implements IFindAllCategoriesUseCase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }
}
