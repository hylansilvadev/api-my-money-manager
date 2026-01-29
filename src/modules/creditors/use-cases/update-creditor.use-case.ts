import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IUpdateCreditorUseCase } from '../interfaces/update-creditor-use-case.interface';
import { UpdateCreditorDto } from '../dto/update-creditor.dto';
import { Creditor } from '../entities/creditor.entity';

@Injectable()
export class UpdateCreditorUseCase implements IUpdateCreditorUseCase {
  constructor(
    @InjectRepository(Creditor)
    private readonly creditorsRepository: Repository<Creditor>,
  ) {}

  async execute({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateCreditorDto;
  }): Promise<UpdateResult> {
    return this.creditorsRepository.update(id, dto);
  }
}
