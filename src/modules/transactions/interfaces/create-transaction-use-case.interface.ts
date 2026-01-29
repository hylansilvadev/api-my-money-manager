import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

export abstract class ICreateTransactionUseCase {
  abstract execute(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction>;
}
