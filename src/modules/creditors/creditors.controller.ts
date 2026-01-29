import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCreditorDto } from './dto/create-creditor.dto';
import { UpdateCreditorDto } from './dto/update-creditor.dto';
import { ICreateCreditorUseCase } from './interfaces/create-creditor-use-case.interface';
import { IFindAllCreditorsUseCase } from './interfaces/find-all-creditors-use-case.interface';
import { IFindCreditorByIdUseCase } from './interfaces/find-creditor-by-id-use-case.interface';
import { IUpdateCreditorUseCase } from './interfaces/update-creditor-use-case.interface';
import { IRemoveCreditorUseCase } from './interfaces/remove-creditor-use-case.interface';

@Controller('creditors')
export class CreditorsController {
  constructor(
    private readonly createCreditorUseCase: ICreateCreditorUseCase,
    private readonly findAllCreditorsUseCase: IFindAllCreditorsUseCase,
    private readonly findCreditorByIdUseCase: IFindCreditorByIdUseCase,
    private readonly updateCreditorUseCase: IUpdateCreditorUseCase,
    private readonly removeCreditorUseCase: IRemoveCreditorUseCase,
  ) {}

  @Post()
  create(@Body() createCreditorDto: CreateCreditorDto) {
    return this.createCreditorUseCase.execute(createCreditorDto);
  }

  @Get()
  findAll() {
    return this.findAllCreditorsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findCreditorByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreditorDto: UpdateCreditorDto,
  ) {
    return this.updateCreditorUseCase.execute({ id, dto: updateCreditorDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCreditorUseCase.execute(id);
  }
}
