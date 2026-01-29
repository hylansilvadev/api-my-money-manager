import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IRemoveCategoryUseCase } from '../interfaces/remove-category-use-case.interface';
import { Category } from '../entities/category.entity';

@Injectable()
export class RemoveCategoryUseCase implements IRemoveCategoryUseCase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async execute(id: string): Promise<DeleteResult> {
    return this.categoriesRepository.delete(id);
  }
}
