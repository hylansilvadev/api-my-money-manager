import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAllDebtsUseCase } from '../interfaces/find-all-debts-use-case.interface';
import { Debt } from '../entities/debt.entity';

@Injectable()
export class FindAllDebtsUseCase implements IFindAllDebtsUseCase {
  constructor(
    @InjectRepository(Debt)
    private readonly debtsRepository: Repository<Debt>,
  ) {}

  async execute(): Promise<Debt[]> {
    return this.debtsRepository.find({ relations: ['creditor'] });
  }
}
