import { Creditor } from '../entities/creditor.entity';
import { CreateCreditorDto } from '../dto/create-creditor.dto';

export abstract class ICreateCreditorUseCase {
  abstract execute(createCreditorDto: CreateCreditorDto): Promise<Creditor>;
}
