import { IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { CategoryType } from '../../../enums/category-type.enum';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  icon: string;

  @IsString()
  color: string;

  @IsEnum(CategoryType)
  type: CategoryType;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
