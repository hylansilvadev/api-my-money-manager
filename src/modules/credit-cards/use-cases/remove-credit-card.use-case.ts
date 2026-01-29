import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IRemoveCreditCardUseCase } from '../interfaces/remove-credit-card-use-case.interface';
import { CreditCard } from '../entities/credit-card.entity';

@Injectable()
export class RemoveCreditCardUseCase implements IRemoveCreditCardUseCase {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardsRepository: Repository<CreditCard>,
  ) {}

  async execute(id: string): Promise<DeleteResult> {
    return this.creditCardsRepository.delete(id);
  }
}
