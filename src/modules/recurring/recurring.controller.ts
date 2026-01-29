import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRecurringDto } from './dto/create-recurring.dto';
import { UpdateRecurringDto } from './dto/update-recurring.dto';
import { ICreateRecurringUseCase } from './interfaces/create-recurring-use-case.interface';
import { IFindAllRecurringUseCase } from './interfaces/find-all-recurring-use-case.interface';
import { IFindRecurringByIdUseCase } from './interfaces/find-recurring-by-id-use-case.interface';
import { IUpdateRecurringUseCase } from './interfaces/update-recurring-use-case.interface';
import { IRemoveRecurringUseCase } from './interfaces/remove-recurring-use-case.interface';

@Controller('recurring')
export class RecurringController {
  constructor(
    private readonly createRecurringUseCase: ICreateRecurringUseCase,
    private readonly findAllRecurringUseCase: IFindAllRecurringUseCase,
    private readonly findRecurringByIdUseCase: IFindRecurringByIdUseCase,
    private readonly updateRecurringUseCase: IUpdateRecurringUseCase,
    private readonly removeRecurringUseCase: IRemoveRecurringUseCase,
  ) {}

  @Post()
  create(@Body() createRecurringDto: CreateRecurringDto) {
    return this.createRecurringUseCase.execute(createRecurringDto);
  }

  @Get()
  findAll() {
    return this.findAllRecurringUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findRecurringByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecurringDto: UpdateRecurringDto,
  ) {
    return this.updateRecurringUseCase.execute({ id, dto: updateRecurringDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeRecurringUseCase.execute(id);
  }
}
