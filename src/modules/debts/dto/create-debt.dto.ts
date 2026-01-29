import { IsString, IsNumber, IsDate, IsUUID, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { DebtStatus } from '../../../enums/debt-status.enum';

export class CreateDebtDto {
  @IsUUID()
  creditorId: string;

  @IsString()
  description: string;

  @IsNumber()
  totalAmount: number;

  @IsNumber()
  remainingAmount: number;

  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @IsEnum(DebtStatus)
  status: DebtStatus;
}
