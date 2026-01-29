import { CreditCard } from '../entities/credit-card.entity';
import { CreateCreditCardDto } from '../dto/create-credit-card.dto';

export abstract class ICreateCreditCardUseCase {
  abstract execute(
    createCreditCardDto: CreateCreditCardDto,
  ): Promise<CreditCard>;
}
