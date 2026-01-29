import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IUpdateCategoryUseCase } from '../interfaces/update-category-use-case.interface';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async execute({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateCategoryDto;
  }): Promise<UpdateResult> {
    return this.categoriesRepository.update(id, dto);
  }
}
