import { Test, TestingModule } from '@nestjs/testing';
import { CreditorsController } from '../../creditors.controller';
import { ICreateCreditorUseCase } from '../../interfaces/create-creditor-use-case.interface';
import { IFindAllCreditorsUseCase } from '../../interfaces/find-all-creditors-use-case.interface';
import { IFindCreditorByIdUseCase } from '../../interfaces/find-creditor-by-id-use-case.interface';
import { IUpdateCreditorUseCase } from '../../interfaces/update-creditor-use-case.interface';
import { IRemoveCreditorUseCase } from '../../interfaces/remove-creditor-use-case.interface';
import { CreateCreditorDto } from '../../dto/create-creditor.dto';
import { UpdateCreditorDto } from '../../dto/update-creditor.dto';

describe('CreditorsController', () => {
  let controller: CreditorsController;
  let createCreditorUseCase: any;
  let findAllCreditorsUseCase: any;
  let findCreditorByIdUseCase: any;
  let updateCreditorUseCase: any;
  let removeCreditorUseCase: any;

  beforeEach(async () => {
    createCreditorUseCase = { execute: jest.fn() };
    findAllCreditorsUseCase = { execute: jest.fn() };
    findCreditorByIdUseCase = { execute: jest.fn() };
    updateCreditorUseCase = { execute: jest.fn() };
    removeCreditorUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditorsController],
      providers: [
        { provide: ICreateCreditorUseCase, useValue: createCreditorUseCase },
        {
          provide: IFindAllCreditorsUseCase,
          useValue: findAllCreditorsUseCase,
        },
        {
          provide: IFindCreditorByIdUseCase,
          useValue: findCreditorByIdUseCase,
        },
        { provide: IUpdateCreditorUseCase, useValue: updateCreditorUseCase },
        { provide: IRemoveCreditorUseCase, useValue: removeCreditorUseCase },
      ],
    }).compile();

    controller = module.get<CreditorsController>(CreditorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a creditor', async () => {
      const dto: CreateCreditorDto = {
        name: 'Test Creditor',
        description: 'Test Description',
        phone: '123456789',
      };

      const result = { id: '1', ...dto };
      createCreditorUseCase.execute.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(createCreditorUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of creditors', async () => {
      const result = [{ id: '1', name: 'Creditor' }];
      findAllCreditorsUseCase.execute.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(findAllCreditorsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single creditor', async () => {
      const result = { id: '1', name: 'Creditor' };
      findCreditorByIdUseCase.execute.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(findCreditorByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a creditor', async () => {
      const dto: UpdateCreditorDto = { name: 'Updated' };
      const result = { id: '1', name: 'Updated' };
      updateCreditorUseCase.execute.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(updateCreditorUseCase.execute).toHaveBeenCalledWith({
        id: '1',
        dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a creditor', async () => {
      removeCreditorUseCase.execute.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBe(undefined);
      expect(removeCreditorUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
