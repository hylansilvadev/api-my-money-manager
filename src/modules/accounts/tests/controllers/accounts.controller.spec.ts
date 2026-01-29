import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from '../../accounts.controller';
import { ICreateAccountUseCase } from '../../interfaces/create-account-use-case.interface';
import { IFindAllAccountsUseCase } from '../../interfaces/find-all-accounts-use-case.interface';
import { IFindAccountByIdUseCase } from '../../interfaces/find-account-by-id-use-case.interface';
import { IUpdateAccountUseCase } from '../../interfaces/update-account-use-case.interface';
import { IRemoveAccountUseCase } from '../../interfaces/remove-account-use-case.interface';
import { CreateAccountDto } from '../../dto/create-account.dto';
import { AccountType } from '../../../../enums/account-type.enum';
import { UpdateAccountDto } from '../../dto/update-account.dto';

describe('AccountsController', () => {
  let controller: AccountsController;
  let createAccountUseCase: any;
  let findAllAccountsUseCase: any;
  let findAccountByIdUseCase: any;
  let updateAccountUseCase: any;
  let removeAccountUseCase: any;

  beforeEach(async () => {
    createAccountUseCase = { execute: jest.fn() };
    findAllAccountsUseCase = { execute: jest.fn() };
    findAccountByIdUseCase = { execute: jest.fn() };
    updateAccountUseCase = { execute: jest.fn() };
    removeAccountUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        { provide: ICreateAccountUseCase, useValue: createAccountUseCase },
        { provide: IFindAllAccountsUseCase, useValue: findAllAccountsUseCase },
        { provide: IFindAccountByIdUseCase, useValue: findAccountByIdUseCase },
        { provide: IUpdateAccountUseCase, useValue: updateAccountUseCase },
        { provide: IRemoveAccountUseCase, useValue: removeAccountUseCase },
      ],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an account', async () => {
      const dto: CreateAccountDto = {
        name: 'Account',
        type: AccountType.CHECKING,
        initialBalance: 100,
        color: '#fff',
        isActive: true,
      };

      const result = { id: '1', ...dto };
      createAccountUseCase.execute.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(createAccountUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of accounts', async () => {
      const result = [{ id: '1', name: 'Account' }];
      findAllAccountsUseCase.execute.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(findAllAccountsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single account', async () => {
      const result = { id: '1', name: 'Account' };
      findAccountByIdUseCase.execute.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(findAccountByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update an account', async () => {
      const dto: UpdateAccountDto = { name: 'Updated' };
      const result = { id: '1', name: 'Updated' };
      updateAccountUseCase.execute.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(updateAccountUseCase.execute).toHaveBeenCalledWith({
        id: '1',
        dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove an account', async () => {
      removeAccountUseCase.execute.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBe(undefined);
      expect(removeAccountUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
