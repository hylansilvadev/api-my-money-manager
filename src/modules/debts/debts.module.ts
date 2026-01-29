import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsController } from './debts.controller';
import { Debt } from './entities/debt.entity';
import { CreateDebtUseCase } from './use-cases/create-debt.use-case';
import { FindAllDebtsUseCase } from './use-cases/find-all-debts.use-case';
import { FindDebtByIdUseCase } from './use-cases/find-debt-by-id.use-case';
import { UpdateDebtUseCase } from './use-cases/update-debt.use-case';
import { RemoveDebtUseCase } from './use-cases/remove-debt.use-case';
import { ICreateDebtUseCase } from './interfaces/create-debt-use-case.interface';
import { IFindAllDebtsUseCase } from './interfaces/find-all-debts-use-case.interface';
import { IFindDebtByIdUseCase } from './interfaces/find-debt-by-id-use-case.interface';
import { IUpdateDebtUseCase } from './interfaces/update-debt-use-case.interface';
import { IRemoveDebtUseCase } from './interfaces/remove-debt-use-case.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  controllers: [DebtsController],
  providers: [
    {
      provide: ICreateDebtUseCase,
      useClass: CreateDebtUseCase,
    },
    {
      provide: IFindAllDebtsUseCase,
      useClass: FindAllDebtsUseCase,
    },
    {
      provide: IFindDebtByIdUseCase,
      useClass: FindDebtByIdUseCase,
    },
    {
      provide: IUpdateDebtUseCase,
      useClass: UpdateDebtUseCase,
    },
    {
      provide: IRemoveDebtUseCase,
      useClass: RemoveDebtUseCase,
    },
  ],
})
export class DebtsModule {}
