import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAllTransactionsUseCase } from '../interfaces/find-all-transactions-use-case.interface';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class FindAllTransactionsUseCase implements IFindAllTransactionsUseCase {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: ['category', 'bankAccount', 'card', 'recurring'],
      order: { date: 'DESC' },
    });
  }
}
