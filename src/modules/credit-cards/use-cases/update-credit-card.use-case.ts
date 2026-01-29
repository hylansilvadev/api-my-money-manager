import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IUpdateCreditCardUseCase } from '../interfaces/update-credit-card-use-case.interface';
import { UpdateCreditCardDto } from '../dto/update-credit-card.dto';
import { CreditCard } from '../entities/credit-card.entity';

@Injectable()
export class UpdateCreditCardUseCase implements IUpdateCreditCardUseCase {
  constructor(
    @InjectRepository(CreditCard)
    private readonly creditCardsRepository: Repository<CreditCard>,
  ) {}

  async execute({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateCreditCardDto;
  }): Promise<UpdateResult> {
    return this.creditCardsRepository.update(id, dto);
  }
}
