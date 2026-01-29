import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { CreateAccountUseCase } from './use-cases/create-account.use-case';
import { FindAllAccountsUseCase } from './use-cases/find-all-accounts.use-case';
import { FindAccountByIdUseCase } from './use-cases/find-account-by-id.use-case';
import { UpdateAccountUseCase } from './use-cases/update-account.use-case';
import { RemoveAccountUseCase } from './use-cases/remove-account.use-case';
import { ICreateAccountUseCase } from './interfaces/create-account-use-case.interface';
import { IFindAllAccountsUseCase } from './interfaces/find-all-accounts-use-case.interface';
import { IFindAccountByIdUseCase } from './interfaces/find-account-by-id-use-case.interface';
import { IUpdateAccountUseCase } from './interfaces/update-account-use-case.interface';
import { IRemoveAccountUseCase } from './interfaces/remove-account-use-case.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [
    {
      provide: ICreateAccountUseCase,
      useClass: CreateAccountUseCase,
    },
    {
      provide: IFindAllAccountsUseCase,
      useClass: FindAllAccountsUseCase,
    },
    {
      provide: IFindAccountByIdUseCase,
      useClass: FindAccountByIdUseCase,
    },
    {
      provide: IUpdateAccountUseCase,
      useClass: UpdateAccountUseCase,
    },
    {
      provide: IRemoveAccountUseCase,
      useClass: RemoveAccountUseCase,
    },
  ],
})
export class AccountsModule {}
