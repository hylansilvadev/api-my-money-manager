import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IRemoveAccountUseCase } from '../interfaces/remove-account-use-case.interface';
import { Account } from '../entities/account.entity';

@Injectable()
export class RemoveAccountUseCase implements IRemoveAccountUseCase {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async execute(id: string): Promise<DeleteResult> {
    return this.accountsRepository.delete(id);
  }
}
