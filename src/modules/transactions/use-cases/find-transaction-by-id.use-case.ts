import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindTransactionByIdUseCase } from '../interfaces/find-transaction-by-id-use-case.interface';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class FindTransactionByIdUseCase implements IFindTransactionByIdUseCase {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async execute(id: string): Promise<Transaction | null> {
    return this.transactionsRepository.findOne({
      where: { id },
      relations: ['category', 'bankAccount', 'card', 'recurring'],
    });
  }
}
