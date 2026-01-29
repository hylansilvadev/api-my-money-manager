import {
  IsString,
  IsNumber,
  IsBoolean,
  IsHexColor,
  IsEnum,
} from 'class-validator';
import { AccountType } from '../../../enums/account-type.enum';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsNumber()
  initialBalance: number;

  @IsHexColor()
  @IsString()
  color: string;

  @IsBoolean()
  isActive: boolean;
}
