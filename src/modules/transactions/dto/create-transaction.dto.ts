import {
  IsString,
  IsNumber,
  IsDate,
  IsUUID,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from '../../../enums/transaction-type.enum';
import { PaymentMethod } from '../../../enums/payment-method.enum';
import { TransactionStatus } from '../../../enums/transaction-status.enum';

export class CreateTransactionDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsUUID()
  categoryId: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsOptional()
  @IsUUID()
  cardId?: string;

  @IsOptional()
  @IsUUID()
  bankAccountId?: string;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @IsOptional()
  @IsUUID()
  recurringId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
