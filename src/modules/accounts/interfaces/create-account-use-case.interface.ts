import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';

export abstract class ICreateAccountUseCase {
  abstract execute(createAccountDto: CreateAccountDto): Promise<Account>;
}
