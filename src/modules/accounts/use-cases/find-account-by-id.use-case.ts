import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFindAccountByIdUseCase } from '../interfaces/find-account-by-id-use-case.interface';
import { Account } from '../entities/account.entity';

@Injectable()
export class FindAccountByIdUseCase implements IFindAccountByIdUseCase {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async execute(id: string): Promise<Account | null> {
    return this.accountsRepository.findOneBy({ id });
  }
}
