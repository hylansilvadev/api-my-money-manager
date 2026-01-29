import { Creditor } from '../entities/creditor.entity';

export abstract class IFindAllCreditorsUseCase {
  abstract execute(): Promise<Creditor[]>;
}
