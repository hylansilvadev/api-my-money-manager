import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateCategoryUseCase } from '../interfaces/create-category-use-case.interface';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async execute(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.save(createCategoryDto);
  }
}
