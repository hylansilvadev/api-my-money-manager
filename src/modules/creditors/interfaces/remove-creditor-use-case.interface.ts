import { DeleteResult } from 'typeorm';

export abstract class IRemoveCreditorUseCase {
  abstract execute(id: string): Promise<DeleteResult>;
}
