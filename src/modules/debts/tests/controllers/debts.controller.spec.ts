import { Test, TestingModule } from '@nestjs/testing';
import { DebtsController } from '../../debts.controller';
import { ICreateDebtUseCase } from '../../interfaces/create-debt-use-case.interface';
import { IFindAllDebtsUseCase } from '../../interfaces/find-all-debts-use-case.interface';
import { IFindDebtByIdUseCase } from '../../interfaces/find-debt-by-id-use-case.interface';
import { IUpdateDebtUseCase } from '../../interfaces/update-debt-use-case.interface';
import { IRemoveDebtUseCase } from '../../interfaces/remove-debt-use-case.interface';
import { CreateDebtDto } from '../../dto/create-debt.dto';
import { UpdateDebtDto } from '../../dto/update-debt.dto';
import { DebtStatus } from '../../../../enums/debt-status.enum';

describe('DebtsController', () => {
  let controller: DebtsController;
  let createDebtUseCase: any;
  let findAllDebtsUseCase: any;
  let findDebtByIdUseCase: any;
  let updateDebtUseCase: any;
  let removeDebtUseCase: any;

  beforeEach(async () => {
    createDebtUseCase = { execute: jest.fn() };
    findAllDebtsUseCase = { execute: jest.fn() };
    findDebtByIdUseCase = { execute: jest.fn() };
    updateDebtUseCase = { execute: jest.fn() };
    removeDebtUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtsController],
      providers: [
        { provide: ICreateDebtUseCase, useValue: createDebtUseCase },
        { provide: IFindAllDebtsUseCase, useValue: findAllDebtsUseCase },
        { provide: IFindDebtByIdUseCase, useValue: findDebtByIdUseCase },
        { provide: IUpdateDebtUseCase, useValue: updateDebtUseCase },
        { provide: IRemoveDebtUseCase, useValue: removeDebtUseCase },
      ],
    }).compile();

    controller = module.get<DebtsController>(DebtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a debt', async () => {
      const dto: CreateDebtDto = {
        creditorId: 'uuid',
        description: 'Test Debt',
        totalAmount: 100,
        remainingAmount: 100,
        dueDate: new Date(),
        status: DebtStatus.PENDING,
      };

      const result = { id: '1', ...dto };
      createDebtUseCase.execute.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(createDebtUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of debts', async () => {
      const result = [{ id: '1', description: 'Debt' }];
      findAllDebtsUseCase.execute.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(findAllDebtsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single debt', async () => {
      const result = { id: '1', description: 'Debt' };
      findDebtByIdUseCase.execute.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(findDebtByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a debt', async () => {
      const dto: UpdateDebtDto = { description: 'Updated' };
      const result = { id: '1', description: 'Updated' };
      updateDebtUseCase.execute.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(updateDebtUseCase.execute).toHaveBeenCalledWith({ id: '1', dto });
    });
  });

  describe('remove', () => {
    it('should remove a debt', async () => {
      removeDebtUseCase.execute.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBe(undefined);
      expect(removeDebtUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
