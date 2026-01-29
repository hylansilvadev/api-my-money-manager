import { UpdateResult } from 'typeorm';
import { UpdateDebtDto } from '../dto/update-debt.dto';

export abstract class IUpdateDebtUseCase {
  abstract execute(params: {
    id: string;
    dto: UpdateDebtDto;
  }): Promise<UpdateResult>;
}
