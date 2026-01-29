import { DeleteResult } from 'typeorm';

export abstract class IRemoveCreditCardUseCase {
  abstract execute(id: string): Promise<DeleteResult>;
}
