import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { ICreateDebtUseCase } from './interfaces/create-debt-use-case.interface';
import { IFindAllDebtsUseCase } from './interfaces/find-all-debts-use-case.interface';
import { IFindDebtByIdUseCase } from './interfaces/find-debt-by-id-use-case.interface';
import { IUpdateDebtUseCase } from './interfaces/update-debt-use-case.interface';
import { IRemoveDebtUseCase } from './interfaces/remove-debt-use-case.interface';

@Controller('debts')
export class DebtsController {
  constructor(
    private readonly createDebtUseCase: ICreateDebtUseCase,
    private readonly findAllDebtsUseCase: IFindAllDebtsUseCase,
    private readonly findDebtByIdUseCase: IFindDebtByIdUseCase,
    private readonly updateDebtUseCase: IUpdateDebtUseCase,
    private readonly removeDebtUseCase: IRemoveDebtUseCase,
  ) {}

  @Post()
  create(@Body() createDebtDto: CreateDebtDto) {
    return this.createDebtUseCase.execute(createDebtDto);
  }

  @Get()
  findAll() {
    return this.findAllDebtsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findDebtByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.updateDebtUseCase.execute({ id, dto: updateDebtDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeDebtUseCase.execute(id);
  }
}
