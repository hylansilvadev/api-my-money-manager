import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IRemoveTransactionUseCase } from '../interfaces/remove-transaction-use-case.interface';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class RemoveTransactionUseCase implements IRemoveTransactionUseCase {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async execute(id: string): Promise<DeleteResult> {
    return this.transactionsRepository.delete(id);
  }
}
