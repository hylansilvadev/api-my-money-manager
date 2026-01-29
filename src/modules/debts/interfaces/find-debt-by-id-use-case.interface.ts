import { Debt } from '../entities/debt.entity';

export abstract class IFindDebtByIdUseCase {
  abstract execute(id: string): Promise<Debt | null>;
}
