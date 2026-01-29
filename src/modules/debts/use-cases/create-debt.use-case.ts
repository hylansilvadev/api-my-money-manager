import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateDebtUseCase } from '../interfaces/create-debt-use-case.interface';
import { CreateDebtDto } from '../dto/create-debt.dto';
import { Debt } from '../entities/debt.entity';

@Injectable()
export class CreateDebtUseCase implements ICreateDebtUseCase {
  constructor(
    @InjectRepository(Debt)
    private readonly debtsRepository: Repository<Debt>,
  ) {}

  async execute(createDebtDto: CreateDebtDto): Promise<Debt> {
    return this.debtsRepository.save(createDebtDto);
  }
}
