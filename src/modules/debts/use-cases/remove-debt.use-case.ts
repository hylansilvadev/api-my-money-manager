import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IRemoveDebtUseCase } from '../interfaces/remove-debt-use-case.interface';
import { Debt } from '../entities/debt.entity';

@Injectable()
export class RemoveDebtUseCase implements IRemoveDebtUseCase {
  constructor(
    @InjectRepository(Debt)
    private readonly debtsRepository: Repository<Debt>,
  ) {}

  async execute(id: string): Promise<DeleteResult> {
    return this.debtsRepository.delete(id);
  }
}
