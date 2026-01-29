import { Debt } from '../entities/debt.entity';

export abstract class IFindAllDebtsUseCase {
  abstract execute(): Promise<Debt[]>;
}
