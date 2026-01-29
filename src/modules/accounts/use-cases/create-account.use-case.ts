import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateAccountUseCase } from '../interfaces/create-account-use-case.interface';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../entities/account.entity';

@Injectable()
export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async execute(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsRepository.save(createAccountDto);
  }
}
