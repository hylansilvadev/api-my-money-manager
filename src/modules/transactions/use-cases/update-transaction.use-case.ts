import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IUpdateTransactionUseCase } from '../interfaces/update-transaction-use-case.interface';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async execute({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateTransactionDto;
  }): Promise<UpdateResult> {
    return this.transactionsRepository.update(id, dto);
  }
}
