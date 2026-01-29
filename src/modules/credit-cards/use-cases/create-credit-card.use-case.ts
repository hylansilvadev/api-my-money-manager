import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateCreditCardUseCase } from '../interfaces/create-credit-card-use-case.interface';
import { CreateCreditCardDto } from '../dto/create-credit-card.dto';
import { CreditCard } from '../entities/credit-card.entity';

@Injectable()
export class CreateCreditCardUseCase implements ICreateCreditCardUseCase {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardsRepository: Repository<CreditCard>,
  ) {}

  async execute(createCreditCardDto: CreateCreditCardDto): Promise<CreditCard> {
    return this.creditCardsRepository.save(createCreditCardDto);
  }
}
