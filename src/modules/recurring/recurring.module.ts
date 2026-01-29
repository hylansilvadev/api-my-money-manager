import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringController } from './recurring.controller';
import { RecurringTransaction } from './entities/recurring.entity';
import { CreateRecurringUseCase } from './use-cases/create-recurring.use-case';
import { FindAllRecurringUseCase } from './use-cases/find-all-recurring.use-case';
import { FindRecurringByIdUseCase } from './use-cases/find-recurring-by-id.use-case';
import { UpdateRecurringUseCase } from './use-cases/update-recurring.use-case';
import { RemoveRecurringUseCase } from './use-cases/remove-recurring.use-case';
import { ICreateRecurringUseCase } from './interfaces/create-recurring-use-case.interface';
import { IFindAllRecurringUseCase } from './interfaces/find-all-recurring-use-case.interface';
import { IFindRecurringByIdUseCase } from './interfaces/find-recurring-by-id-use-case.interface';
import { IUpdateRecurringUseCase } from './interfaces/update-recurring-use-case.interface';
import { IRemoveRecurringUseCase } from './interfaces/remove-recurring-use-case.interface';

@Module({
  imports: [TypeOrmModule.forFeature([RecurringTransaction])],
  controllers: [RecurringController],
  providers: [
    {
      provide: ICreateRecurringUseCase,
      useClass: CreateRecurringUseCase,
    },
    {
      provide: IFindAllRecurringUseCase,
      useClass: FindAllRecurringUseCase,
    },
    {
      provide: IFindRecurringByIdUseCase,
      useClass: FindRecurringByIdUseCase,
    },
    {
      provide: IUpdateRecurringUseCase,
      useClass: UpdateRecurringUseCase,
    },
    {
      provide: IRemoveRecurringUseCase,
      useClass: RemoveRecurringUseCase,
    },
  ],
})
export class RecurringModule {}
