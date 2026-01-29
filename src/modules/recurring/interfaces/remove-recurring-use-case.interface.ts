import { DeleteResult } from 'typeorm';

export abstract class IRemoveRecurringUseCase {
  abstract execute(id: string): Promise<DeleteResult>;
}
