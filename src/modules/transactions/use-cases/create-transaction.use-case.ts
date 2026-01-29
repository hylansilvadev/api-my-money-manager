import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateTransactionUseCase } from '../interfaces/create-transaction-use-case.interface';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async execute(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsRepository.save(createTransactionDto);
  }
}
