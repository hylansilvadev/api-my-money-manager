import { RecurringTransaction } from '../entities/recurring.entity';

export abstract class IFindAllRecurringUseCase {
  abstract execute(): Promise<RecurringTransaction[]>;
}
