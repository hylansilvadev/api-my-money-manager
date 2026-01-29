import { DeleteResult } from 'typeorm';

export abstract class IRemoveDebtUseCase {
  abstract execute(id: string): Promise<DeleteResult>;
}
