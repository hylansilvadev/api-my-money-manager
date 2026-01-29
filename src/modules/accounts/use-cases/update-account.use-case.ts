import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IUpdateAccountUseCase } from '../interfaces/update-account-use-case.interface';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Account } from '../entities/account.entity';

@Injectable()
export class UpdateAccountUseCase implements IUpdateAccountUseCase {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async execute({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateAccountDto;
  }): Promise<UpdateResult> {
    return this.accountsRepository.update(id, dto);
  }
}
