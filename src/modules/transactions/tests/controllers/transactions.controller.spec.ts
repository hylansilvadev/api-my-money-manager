import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from '../../transactions.controller';
import { ICreateTransactionUseCase } from '../../interfaces/create-transaction-use-case.interface';
import { IFindAllTransactionsUseCase } from '../../interfaces/find-all-transactions-use-case.interface';
import { IFindTransactionByIdUseCase } from '../../interfaces/find-transaction-by-id-use-case.interface';
import { IUpdateTransactionUseCase } from '../../interfaces/update-transaction-use-case.interface';
import { IRemoveTransactionUseCase } from '../../interfaces/remove-transaction-use-case.interface';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../dto/update-transaction.dto';
import { TransactionType } from '../../../../enums/transaction-type.enum';
import { PaymentMethod } from '../../../../enums/payment-method.enum';
import { TransactionStatus } from '../../../../enums/transaction-status.enum';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let createTransactionUseCase: any;
  let findAllTransactionsUseCase: any;
  let findTransactionByIdUseCase: any;
  let updateTransactionUseCase: any;
  let removeTransactionUseCase: any;

  beforeEach(async () => {
    createTransactionUseCase = { execute: jest.fn() };
    findAllTransactionsUseCase = { execute: jest.fn() };
    findTransactionByIdUseCase = { execute: jest.fn() };
    updateTransactionUseCase = { execute: jest.fn() };
    removeTransactionUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: ICreateTransactionUseCase,
          useValue: createTransactionUseCase,
        },
        {
          provide: IFindAllTransactionsUseCase,
          useValue: findAllTransactionsUseCase,
        },
        {
          provide: IFindTransactionByIdUseCase,
          useValue: findTransactionByIdUseCase,
        },
        {
          provide: IUpdateTransactionUseCase,
          useValue: updateTransactionUseCase,
        },
        {
          provide: IRemoveTransactionUseCase,
          useValue: removeTransactionUseCase,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a transaction', async () => {
      const dto: CreateTransactionDto = {
        description: 'Lunch',
        amount: 25.0,
        date: new Date(),
        type: TransactionType.EXPENSE,
        categoryId: 'cat-uuid',
        paymentMethod: PaymentMethod.CASH,
        status: TransactionStatus.PAID,
      };

      const result = { id: '1', ...dto };
      createTransactionUseCase.execute.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(createTransactionUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const result = [{ id: '1', description: 'Lunch' }];
      findAllTransactionsUseCase.execute.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(findAllTransactionsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single transaction', async () => {
      const result = { id: '1', description: 'Lunch' };
      findTransactionByIdUseCase.execute.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(findTransactionByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a transaction', async () => {
      const dto: UpdateTransactionDto = { description: 'Updated' };
      const result = { id: '1', description: 'Updated' };
      updateTransactionUseCase.execute.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(updateTransactionUseCase.execute).toHaveBeenCalledWith({
        id: '1',
        dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a transaction', async () => {
      removeTransactionUseCase.execute.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBe(undefined);
      expect(removeTransactionUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
