import { Account } from '../entities/account.entity';

export abstract class IFindAllAccountsUseCase {
  abstract execute(): Promise<Account[]>;
}
