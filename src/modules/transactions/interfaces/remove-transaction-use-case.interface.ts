import { DeleteResult } from 'typeorm';

export abstract class IRemoveTransactionUseCase {
  abstract execute(id: string): Promise<DeleteResult>;
}
