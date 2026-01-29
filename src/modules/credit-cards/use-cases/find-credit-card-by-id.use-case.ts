import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindCreditCardByIdUseCase } from '../interfaces/find-credit-card-by-id-use-case.interface';
import { CreditCard } from '../entities/credit-card.entity';

@Injectable()
export class FindCreditCardByIdUseCase implements IFindCreditCardByIdUseCase {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardsRepository: Repository<CreditCard>,
  ) {}

  async execute(id: string): Promise<CreditCard | null> {
    return this.creditCardsRepository.findOne({
      where: { id },
      relations: ['bankAccount'],
    });
  }
}
