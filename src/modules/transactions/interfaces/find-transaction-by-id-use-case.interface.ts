import { Transaction } from '../entities/transaction.entity';

export abstract class IFindTransactionByIdUseCase {
  abstract execute(id: string): Promise<Transaction | null>;
}
