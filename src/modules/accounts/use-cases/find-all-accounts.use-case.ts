import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAllAccountsUseCase } from '../interfaces/find-all-accounts-use-case.interface';
import { Account } from '../entities/account.entity';

@Injectable()
export class FindAllAccountsUseCase implements IFindAllAccountsUseCase {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async execute(): Promise<Account[]> {
    return this.accountsRepository.find();
  }
}
