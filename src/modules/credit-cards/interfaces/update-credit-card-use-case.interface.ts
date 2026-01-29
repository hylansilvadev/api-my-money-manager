import { UpdateResult } from 'typeorm';
import { UpdateCreditCardDto } from '../dto/update-credit-card.dto';

export abstract class IUpdateCreditCardUseCase {
  abstract execute(params: {
    id: string;
    dto: UpdateCreditCardDto;
  }): Promise<UpdateResult>;
}
