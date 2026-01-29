import { Transaction } from '../entities/transaction.entity';

export abstract class IFindAllTransactionsUseCase {
  abstract execute(): Promise<Transaction[]>;
}
