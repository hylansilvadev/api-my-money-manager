import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateCreditorUseCase } from '../interfaces/create-creditor-use-case.interface';
import { CreateCreditorDto } from '../dto/create-creditor.dto';
import { Creditor } from '../entities/creditor.entity';

@Injectable()
export class CreateCreditorUseCase implements ICreateCreditorUseCase {
  constructor(
    @InjectRepository(Creditor)
    private readonly creditorsRepository: Repository<Creditor>,
  ) {}

  async execute(createCreditorDto: CreateCreditorDto): Promise<Creditor> {
    return this.creditorsRepository.save(createCreditorDto);
  }
}
