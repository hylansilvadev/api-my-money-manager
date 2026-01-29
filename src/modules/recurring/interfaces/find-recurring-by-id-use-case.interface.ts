import { RecurringTransaction } from '../entities/recurring.entity';

export abstract class IFindRecurringByIdUseCase {
  abstract execute(id: string): Promise<RecurringTransaction | null>;
}
