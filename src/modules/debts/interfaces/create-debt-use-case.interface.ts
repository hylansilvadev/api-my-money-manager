import { Debt } from '../entities/debt.entity';
import { CreateDebtDto } from '../dto/create-debt.dto';

export abstract class ICreateDebtUseCase {
  abstract execute(createDebtDto: CreateDebtDto): Promise<Debt>;
}
