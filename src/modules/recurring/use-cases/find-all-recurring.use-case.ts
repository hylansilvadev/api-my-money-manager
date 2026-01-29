import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAllRecurringUseCase } from '../interfaces/find-all-recurring-use-case.interface';
import { RecurringTransaction } from '../entities/recurring.entity';

@Injectable()
export class FindAllRecurringUseCase implements IFindAllRecurringUseCase {
  constructor(
    @InjectRepository(RecurringTransaction)
    private readonly recurringRepository: Repository<RecurringTransaction>,
  ) {}

  async execute(): Promise<RecurringTransaction[]> {
    return this.recurringRepository.find({
      relations: ['category', 'bankAccount', 'card'],
    });
  }
}
