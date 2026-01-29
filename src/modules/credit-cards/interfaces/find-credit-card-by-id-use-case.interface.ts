import { CreditCard } from '../entities/credit-card.entity';

export abstract class IFindCreditCardByIdUseCase {
  abstract execute(id: string): Promise<CreditCard | null>;
}
