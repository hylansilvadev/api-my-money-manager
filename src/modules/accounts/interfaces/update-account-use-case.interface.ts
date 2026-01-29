import { UpdateResult } from 'typeorm';
import { UpdateAccountDto } from '../dto/update-account.dto';

export abstract class IUpdateAccountUseCase {
  abstract execute(params: {
    id: string;
    dto: UpdateAccountDto;
  }): Promise<UpdateResult>;
}
