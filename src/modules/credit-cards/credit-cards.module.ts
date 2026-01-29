import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCardsController } from './credit-cards.controller';
import { CreditCard } from './entities/credit-card.entity';
import { CreateCreditCardUseCase } from './use-cases/create-credit-card.use-case';
import { FindAllCreditCardsUseCase } from './use-cases/find-all-credit-cards.use-case';
import { FindCreditCardByIdUseCase } from './use-cases/find-credit-card-by-id.use-case';
import { UpdateCreditCardUseCase } from './use-cases/update-credit-card.use-case';
import { RemoveCreditCardUseCase } from './use-cases/remove-credit-card.use-case';
import { ICreateCreditCardUseCase } from './interfaces/create-credit-card-use-case.interface';
import { IFindAllCreditCardsUseCase } from './interfaces/find-all-credit-cards-use-case.interface';
import { IFindCreditCardByIdUseCase } from './interfaces/find-credit-card-by-id-use-case.interface';
import { IUpdateCreditCardUseCase } from './interfaces/update-credit-card-use-case.interface';
import { IRemoveCreditCardUseCase } from './interfaces/remove-credit-card-use-case.interface';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard])],
  controllers: [CreditCardsController],
  providers: [
    {
      provide: ICreateCreditCardUseCase,
      useClass: CreateCreditCardUseCase,
    },
    {
      provide: IFindAllCreditCardsUseCase,
      useClass: FindAllCreditCardsUseCase,
    },
    {
      provide: IFindCreditCardByIdUseCase,
      useClass: FindCreditCardByIdUseCase,
    },
    {
      provide: IUpdateCreditCardUseCase,
      useClass: UpdateCreditCardUseCase,
    },
    {
      provide: IRemoveCreditCardUseCase,
      useClass: RemoveCreditCardUseCase,
    },
  ],
})
export class CreditCardsModule {}
