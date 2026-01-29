import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateRecurringUseCase } from '../interfaces/create-recurring-use-case.interface';
import { CreateRecurringDto } from '../dto/create-recurring.dto';
import { RecurringTransaction } from '../entities/recurring.entity';

@Injectable()
export class CreateRecurringUseCase implements ICreateRecurringUseCase {
  constructor(
    @InjectRepository(RecurringTransaction)
    private readonly recurringRepository: Repository<RecurringTransaction>,
  ) {}

  async execute(
    createRecurringDto: CreateRecurringDto,
  ): Promise<RecurringTransaction> {
    return this.recurringRepository.save(createRecurringDto);
  }
}
