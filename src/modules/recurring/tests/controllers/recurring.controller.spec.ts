import { Test, TestingModule } from '@nestjs/testing';
import { RecurringController } from '../../recurring.controller';
import { ICreateRecurringUseCase } from '../../interfaces/create-recurring-use-case.interface';
import { IFindAllRecurringUseCase } from '../../interfaces/find-all-recurring-use-case.interface';
import { IFindRecurringByIdUseCase } from '../../interfaces/find-recurring-by-id-use-case.interface';
import { IUpdateRecurringUseCase } from '../../interfaces/update-recurring-use-case.interface';
import { IRemoveRecurringUseCase } from '../../interfaces/remove-recurring-use-case.interface';
import { CreateRecurringDto } from '../../dto/create-recurring.dto';
import { UpdateRecurringDto } from '../../dto/update-recurring.dto';
import { TransactionType } from '../../../../enums/transaction-type.enum';
import { PaymentMethod } from '../../../../enums/payment-method.enum';
import { RecurrenceFrequency } from '../../../../enums/recurrence-frequency.enum';

describe('RecurringController', () => {
  let controller: RecurringController;
  let createRecurringUseCase: any;
  let findAllRecurringUseCase: any;
  let findRecurringByIdUseCase: any;
  let updateRecurringUseCase: any;
  let removeRecurringUseCase: any;

  beforeEach(async () => {
    createRecurringUseCase = { execute: jest.fn() };
    findAllRecurringUseCase = { execute: jest.fn() };
    findRecurringByIdUseCase = { execute: jest.fn() };
    updateRecurringUseCase = { execute: jest.fn() };
    removeRecurringUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurringController],
      providers: [
        { provide: ICreateRecurringUseCase, useValue: createRecurringUseCase },
        {
          provide: IFindAllRecurringUseCase,
          useValue: findAllRecurringUseCase,
        },
        {
          provide: IFindRecurringByIdUseCase,
          useValue: findRecurringByIdUseCase,
        },
        { provide: IUpdateRecurringUseCase, useValue: updateRecurringUseCase },
        { provide: IRemoveRecurringUseCase, useValue: removeRecurringUseCase },
      ],
    }).compile();

    controller = module.get<RecurringController>(RecurringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a recurring transaction', async () => {
      const dto: CreateRecurringDto = {
        description: 'Netflix',
        amount: 29.9,
        type: TransactionType.EXPENSE,
        categoryId: 'cat-uuid',
        paymentMethod: PaymentMethod.CREDIT_CARD,
        frequency: RecurrenceFrequency.MONTHLY,
        dayOfMonth: 10,
        startDate: new Date(),
        isActive: true,
      };

      const result = { id: '1', ...dto };
      createRecurringUseCase.execute.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(createRecurringUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of recurring transactions', async () => {
      const result = [{ id: '1', description: 'Netflix' }];
      findAllRecurringUseCase.execute.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(findAllRecurringUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single recurring transaction', async () => {
      const result = { id: '1', description: 'Netflix' };
      findRecurringByIdUseCase.execute.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(findRecurringByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a recurring transaction', async () => {
      const dto: UpdateRecurringDto = { description: 'Updated' };
      const result = { id: '1', description: 'Updated' };
      updateRecurringUseCase.execute.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(updateRecurringUseCase.execute).toHaveBeenCalledWith({
        id: '1',
        dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a recurring transaction', async () => {
      removeRecurringUseCase.execute.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBe(undefined);
      expect(removeRecurringUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
