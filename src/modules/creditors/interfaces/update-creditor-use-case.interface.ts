import { UpdateResult } from 'typeorm';
import { UpdateCreditorDto } from '../dto/update-creditor.dto';

export abstract class IUpdateCreditorUseCase {
  abstract execute(params: {
    id: string;
    dto: UpdateCreditorDto;
  }): Promise<UpdateResult>;
}
