import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IUpdateDebtUseCase } from '../interfaces/update-debt-use-case.interface';
import { UpdateDebtDto } from '../dto/update-debt.dto';
import { Debt } from '../entities/debt.entity';

@Injectable()
export class UpdateDebtUseCase implements IUpdateDebtUseCase {
  constructor(
    @InjectRepository(Debt)
    private readonly debtsRepository: Repository<Debt>,
  ) {}

  async execute({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateDebtDto;
  }): Promise<UpdateResult> {
    return this.debtsRepository.update(id, dto);
  }
}
