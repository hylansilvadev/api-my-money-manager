import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IUpdateRecurringUseCase } from '../interfaces/update-recurring-use-case.interface';
import { UpdateRecurringDto } from '../dto/update-recurring.dto';
import { RecurringTransaction } from '../entities/recurring.entity';

@Injectable()
export class UpdateRecurringUseCase implements IUpdateRecurringUseCase {
  constructor(
    @InjectRepository(RecurringTransaction)
    private readonly recurringRepository: Repository<RecurringTransaction>,
  ) {}

  async execute({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateRecurringDto;
  }): Promise<UpdateResult> {
    return this.recurringRepository.update(id, dto);
  }
}
