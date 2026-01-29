import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ICreateTransactionUseCase } from './interfaces/create-transaction-use-case.interface';
import { IFindAllTransactionsUseCase } from './interfaces/find-all-transactions-use-case.interface';
import { IFindTransactionByIdUseCase } from './interfaces/find-transaction-by-id-use-case.interface';
import { IUpdateTransactionUseCase } from './interfaces/update-transaction-use-case.interface';
import { IRemoveTransactionUseCase } from './interfaces/remove-transaction-use-case.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: ICreateTransactionUseCase,
    private readonly findAllTransactionsUseCase: IFindAllTransactionsUseCase,
    private readonly findTransactionByIdUseCase: IFindTransactionByIdUseCase,
    private readonly updateTransactionUseCase: IUpdateTransactionUseCase,
    private readonly removeTransactionUseCase: IRemoveTransactionUseCase,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.findAllTransactionsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findTransactionByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.updateTransactionUseCase.execute({
      id,
      dto: updateTransactionDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeTransactionUseCase.execute(id);
  }
}
