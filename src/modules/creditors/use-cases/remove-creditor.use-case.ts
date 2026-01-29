import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IRemoveCreditorUseCase } from '../interfaces/remove-creditor-use-case.interface';
import { Creditor } from '../entities/creditor.entity';

@Injectable()
export class RemoveCreditorUseCase implements IRemoveCreditorUseCase {
  constructor(
    @InjectRepository(Creditor)
    private readonly creditorsRepository: Repository<Creditor>,
  ) {}

  async execute(id: string): Promise<DeleteResult> {
    return this.creditorsRepository.delete(id);
  }
}
