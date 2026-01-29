import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICreateCategoryUseCase } from './interfaces/create-category-use-case.interface';
import { IFindAllCategoriesUseCase } from './interfaces/find-all-categories-use-case.interface';
import { IFindCategoryByIdUseCase } from './interfaces/find-category-by-id-use-case.interface';
import { IUpdateCategoryUseCase } from './interfaces/update-category-use-case.interface';
import { IRemoveCategoryUseCase } from './interfaces/remove-category-use-case.interface';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: ICreateCategoryUseCase,
    private readonly findAllCategoriesUseCase: IFindAllCategoriesUseCase,
    private readonly findCategoryByIdUseCase: IFindCategoryByIdUseCase,
    private readonly updateCategoryUseCase: IUpdateCategoryUseCase,
    private readonly removeCategoryUseCase: IRemoveCategoryUseCase,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.findAllCategoriesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findCategoryByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateCategoryUseCase.execute({ id, dto: updateCategoryDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCategoryUseCase.execute(id);
  }
}
