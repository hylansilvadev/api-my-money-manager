import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAllCreditorsUseCase } from '../interfaces/find-all-creditors-use-case.interface';
import { Creditor } from '../entities/creditor.entity';

@Injectable()
export class FindAllCreditorsUseCase implements IFindAllCreditorsUseCase {
  constructor(
    @InjectRepository(Creditor)
    private readonly creditorsRepository: Repository<Creditor>,
  ) {}

  async execute(): Promise<Creditor[]> {
    return this.creditorsRepository.find();
  }
}
