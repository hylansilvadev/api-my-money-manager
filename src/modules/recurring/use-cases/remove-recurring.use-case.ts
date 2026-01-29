import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IRemoveRecurringUseCase } from '../interfaces/remove-recurring-use-case.interface';
import { RecurringTransaction } from '../entities/recurring.entity';

@Injectable()
export class RemoveRecurringUseCase implements IRemoveRecurringUseCase {
  constructor(
    @InjectRepository(RecurringTransaction)
    private readonly recurringRepository: Repository<RecurringTransaction>,
  ) {}

  async execute(id: string): Promise<DeleteResult> {
    return this.recurringRepository.delete(id);
  }
}
