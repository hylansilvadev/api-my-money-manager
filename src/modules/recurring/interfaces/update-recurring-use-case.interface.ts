import { UpdateResult } from 'typeorm';
import { UpdateRecurringDto } from '../dto/update-recurring.dto';

export abstract class IUpdateRecurringUseCase {
  abstract execute(params: {
    id: string;
    dto: UpdateRecurringDto;
  }): Promise<UpdateResult>;
}
