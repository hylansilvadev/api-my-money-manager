import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { FindAllTransactionsUseCase } from './use-cases/find-all-transactions.use-case';
import { FindTransactionByIdUseCase } from './use-cases/find-transaction-by-id.use-case';
import { UpdateTransactionUseCase } from './use-cases/update-transaction.use-case';
import { RemoveTransactionUseCase } from './use-cases/remove-transaction.use-case';
import { ICreateTransactionUseCase } from './interfaces/create-transaction-use-case.interface';
import { IFindAllTransactionsUseCase } from './interfaces/find-all-transactions-use-case.interface';
import { IFindTransactionByIdUseCase } from './interfaces/find-transaction-by-id-use-case.interface';
import { IUpdateTransactionUseCase } from './interfaces/update-transaction-use-case.interface';
import { IRemoveTransactionUseCase } from './interfaces/remove-transaction-use-case.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [
    {
      provide: ICreateTransactionUseCase,
      useClass: CreateTransactionUseCase,
    },
    {
      provide: IFindAllTransactionsUseCase,
      useClass: FindAllTransactionsUseCase,
    },
    {
      provide: IFindTransactionByIdUseCase,
      useClass: FindTransactionByIdUseCase,
    },
    {
      provide: IUpdateTransactionUseCase,
      useClass: UpdateTransactionUseCase,
    },
    {
      provide: IRemoveTransactionUseCase,
      useClass: RemoveTransactionUseCase,
    },
  ],
})
export class TransactionsModule {}
