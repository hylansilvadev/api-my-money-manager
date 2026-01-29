import { Creditor } from '../entities/creditor.entity';

export abstract class IFindCreditorByIdUseCase {
  abstract execute(id: string): Promise<Creditor | null>;
}
