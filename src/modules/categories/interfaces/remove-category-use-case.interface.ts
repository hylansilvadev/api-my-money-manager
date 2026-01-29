import { DeleteResult } from 'typeorm';

export abstract class IRemoveCategoryUseCase {
  abstract execute(id: string): Promise<DeleteResult>;
}
