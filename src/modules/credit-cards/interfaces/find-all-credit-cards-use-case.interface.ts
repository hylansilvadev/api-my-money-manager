import { CreditCard } from '../entities/credit-card.entity';

export abstract class IFindAllCreditCardsUseCase {
  abstract execute(): Promise<CreditCard[]>;
}
