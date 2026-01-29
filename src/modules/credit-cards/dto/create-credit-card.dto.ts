import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Length,
  Min,
  Max,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { CardBrand } from '../../../enums/card-brand.enum';

export class CreateCreditCardDto {
  @IsString()
  name: string;

  @IsString()
  @Length(4, 4)
  lastDigits: string;

  @IsNumber()
  limit: number;

  @IsNumber()
  @Min(1)
  @Max(31)
  closingDay: number;

  @IsNumber()
  @Min(1)
  @Max(31)
  dueDay: number;

  @IsString()
  color: string;

  @IsEnum(CardBrand)
  brand: CardBrand;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsUUID()
  bankAccountId?: string;
}
