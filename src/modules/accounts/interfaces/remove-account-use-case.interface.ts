import { DeleteResult } from 'typeorm';

export abstract class IRemoveAccountUseCase {
  abstract execute(id: string): Promise<DeleteResult>;
}
