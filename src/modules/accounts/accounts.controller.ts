import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ICreateAccountUseCase } from './interfaces/create-account-use-case.interface';
import { IFindAllAccountsUseCase } from './interfaces/find-all-accounts-use-case.interface';
import { IFindAccountByIdUseCase } from './interfaces/find-account-by-id-use-case.interface';
import { IUpdateAccountUseCase } from './interfaces/update-account-use-case.interface';
import { IRemoveAccountUseCase } from './interfaces/remove-account-use-case.interface';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createAccountUseCase: ICreateAccountUseCase,
    private readonly findAllAccountsUseCase: IFindAllAccountsUseCase,
    private readonly findAccountByIdUseCase: IFindAccountByIdUseCase,
    private readonly updateAccountUseCase: IUpdateAccountUseCase,
    private readonly removeAccountUseCase: IRemoveAccountUseCase,
  ) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.createAccountUseCase.execute(createAccountDto);
  }

  @Get()
  findAll() {
    return this.findAllAccountsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findAccountByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.updateAccountUseCase.execute({ id, dto: updateAccountDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeAccountUseCase.execute(id);
  }
}
