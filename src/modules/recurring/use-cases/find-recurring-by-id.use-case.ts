import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindRecurringByIdUseCase } from '../interfaces/find-recurring-by-id-use-case.interface';
import { RecurringTransaction } from '../entities/recurring.entity';

@Injectable()
export class FindRecurringByIdUseCase implements IFindRecurringByIdUseCase {
  constructor(
    @InjectRepository(RecurringTransaction)
    private readonly recurringRepository: Repository<RecurringTransaction>,
  ) {}

  async execute(id: string): Promise<RecurringTransaction | null> {
    return this.recurringRepository.findOne({
      where: { id },
      relations: ['category', 'bankAccount', 'card'],
    });
  }
}
