import { UpdateResult } from 'typeorm';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

export abstract class IUpdateTransactionUseCase {
  abstract execute(params: {
    id: string;
    dto: UpdateTransactionDto;
  }): Promise<UpdateResult>;
}
