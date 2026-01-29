import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindCreditorByIdUseCase } from '../interfaces/find-creditor-by-id-use-case.interface';
import { Creditor } from '../entities/creditor.entity';

@Injectable()
export class FindCreditorByIdUseCase implements IFindCreditorByIdUseCase {
  constructor(
    @InjectRepository(Creditor)
    private readonly creditorsRepository: Repository<Creditor>,
  ) {}

  async execute(id: string): Promise<Creditor | null> {
    return this.creditorsRepository.findOneBy({ id });
  }
}
