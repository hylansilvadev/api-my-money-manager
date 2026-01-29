import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditorsController } from './creditors.controller';
import { Creditor } from './entities/creditor.entity';
import { CreateCreditorUseCase } from './use-cases/create-creditor.use-case';
import { FindAllCreditorsUseCase } from './use-cases/find-all-creditors.use-case';
import { FindCreditorByIdUseCase } from './use-cases/find-creditor-by-id.use-case';
import { UpdateCreditorUseCase } from './use-cases/update-creditor.use-case';
import { RemoveCreditorUseCase } from './use-cases/remove-creditor.use-case';
import { ICreateCreditorUseCase } from './interfaces/create-creditor-use-case.interface';
import { IFindAllCreditorsUseCase } from './interfaces/find-all-creditors-use-case.interface';
import { IFindCreditorByIdUseCase } from './interfaces/find-creditor-by-id-use-case.interface';
import { IUpdateCreditorUseCase } from './interfaces/update-creditor-use-case.interface';
import { IRemoveCreditorUseCase } from './interfaces/remove-creditor-use-case.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Creditor])],
  controllers: [CreditorsController],
  providers: [
    {
      provide: ICreateCreditorUseCase,
      useClass: CreateCreditorUseCase,
    },
    {
      provide: IFindAllCreditorsUseCase,
      useClass: FindAllCreditorsUseCase,
    },
    {
      provide: IFindCreditorByIdUseCase,
      useClass: FindCreditorByIdUseCase,
    },
    {
      provide: IUpdateCreditorUseCase,
      useClass: UpdateCreditorUseCase,
    },
    {
      provide: IRemoveCreditorUseCase,
      useClass: RemoveCreditorUseCase,
    },
  ],
})
export class CreditorsModule {}
