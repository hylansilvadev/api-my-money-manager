import { RecurringTransaction } from '../entities/recurring.entity';
import { CreateRecurringDto } from '../dto/create-recurring.dto';

export abstract class ICreateRecurringUseCase {
  abstract execute(
    createRecurringDto: CreateRecurringDto,
  ): Promise<RecurringTransaction>;
}
