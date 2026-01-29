import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAllCreditCardsUseCase } from '../interfaces/find-all-credit-cards-use-case.interface';
import { CreditCard } from '../entities/credit-card.entity';

@Injectable()
export class FindAllCreditCardsUseCase implements IFindAllCreditCardsUseCase {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardsRepository: Repository<CreditCard>,
  ) {}

  async execute(): Promise<CreditCard[]> {
    return this.creditCardsRepository.find({ relations: ['bankAccount'] });
  }
}
