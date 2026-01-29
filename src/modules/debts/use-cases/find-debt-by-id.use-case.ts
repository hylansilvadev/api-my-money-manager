import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindDebtByIdUseCase } from '../interfaces/find-debt-by-id-use-case.interface';
import { Debt } from '../entities/debt.entity';

@Injectable()
export class FindDebtByIdUseCase implements IFindDebtByIdUseCase {
  constructor(
    @InjectRepository(Debt)
    private readonly debtsRepository: Repository<Debt>,
  ) {}

  async execute(id: string): Promise<Debt | null> {
    return this.debtsRepository.findOne({
      where: { id },
      relations: ['creditor'],
    });
  }
}
