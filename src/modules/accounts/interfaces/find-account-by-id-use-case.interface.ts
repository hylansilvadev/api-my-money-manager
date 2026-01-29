import { Account } from '../entities/account.entity';

export abstract class IFindAccountByIdUseCase {
  abstract execute(id: string): Promise<Account | null>;
}
