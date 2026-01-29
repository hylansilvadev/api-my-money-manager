import {
  IsString,
  IsNumber,
  IsDate,
  IsUUID,
  IsBoolean,
  IsOptional,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from '../../../enums/transaction-type.enum';
import { PaymentMethod } from '../../../enums/payment-method.enum';
import { RecurrenceFrequency } from '../../../enums/recurrence-frequency.enum';

export class CreateRecurringDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsUUID()
  categoryId: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsEnum(RecurrenceFrequency)
  frequency: RecurrenceFrequency;

  @IsNumber()
  @Min(1)
  @Max(31)
  dayOfMonth: number;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsUUID()
  bankAccountId?: string;

  @IsOptional()
  @IsUUID()
  cardId?: string;
}
