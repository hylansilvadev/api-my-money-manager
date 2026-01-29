import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { ICreateCreditCardUseCase } from './interfaces/create-credit-card-use-case.interface';
import { IFindAllCreditCardsUseCase } from './interfaces/find-all-credit-cards-use-case.interface';
import { IFindCreditCardByIdUseCase } from './interfaces/find-credit-card-by-id-use-case.interface';
import { IUpdateCreditCardUseCase } from './interfaces/update-credit-card-use-case.interface';
import { IRemoveCreditCardUseCase } from './interfaces/remove-credit-card-use-case.interface';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(
    private readonly createCreditCardUseCase: ICreateCreditCardUseCase,
    private readonly findAllCreditCardsUseCase: IFindAllCreditCardsUseCase,
    private readonly findCreditCardByIdUseCase: IFindCreditCardByIdUseCase,
    private readonly updateCreditCardUseCase: IUpdateCreditCardUseCase,
    private readonly removeCreditCardUseCase: IRemoveCreditCardUseCase,
  ) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.createCreditCardUseCase.execute(createCreditCardDto);
  }

  @Get()
  findAll() {
    return this.findAllCreditCardsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findCreditCardByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreditCardDto: UpdateCreditCardDto,
  ) {
    return this.updateCreditCardUseCase.execute({
      id,
      dto: updateCreditCardDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCreditCardUseCase.execute(id);
  }
}
