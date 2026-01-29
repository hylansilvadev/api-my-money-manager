import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardsController } from '../../credit-cards.controller';
import { ICreateCreditCardUseCase } from '../../interfaces/create-credit-card-use-case.interface';
import { IFindAllCreditCardsUseCase } from '../../interfaces/find-all-credit-cards-use-case.interface';
import { IFindCreditCardByIdUseCase } from '../../interfaces/find-credit-card-by-id-use-case.interface';
import { IUpdateCreditCardUseCase } from '../../interfaces/update-credit-card-use-case.interface';
import { IRemoveCreditCardUseCase } from '../../interfaces/remove-credit-card-use-case.interface';
import { CreateCreditCardDto } from '../../dto/create-credit-card.dto';
import { UpdateCreditCardDto } from '../../dto/update-credit-card.dto';
import { CardBrand } from '../../../../enums/card-brand.enum';

describe('CreditCardsController', () => {
  let controller: CreditCardsController;
  let createCreditCardUseCase: any;
  let findAllCreditCardsUseCase: any;
  let findCreditCardByIdUseCase: any;
  let updateCreditCardUseCase: any;
  let removeCreditCardUseCase: any;

  beforeEach(async () => {
    createCreditCardUseCase = { execute: jest.fn() };
    findAllCreditCardsUseCase = { execute: jest.fn() };
    findCreditCardByIdUseCase = { execute: jest.fn() };
    updateCreditCardUseCase = { execute: jest.fn() };
    removeCreditCardUseCase = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardsController],
      providers: [
        {
          provide: ICreateCreditCardUseCase,
          useValue: createCreditCardUseCase,
        },
        {
          provide: IFindAllCreditCardsUseCase,
          useValue: findAllCreditCardsUseCase,
        },
        {
          provide: IFindCreditCardByIdUseCase,
          useValue: findCreditCardByIdUseCase,
        },
        {
          provide: IUpdateCreditCardUseCase,
          useValue: updateCreditCardUseCase,
        },
        {
          provide: IRemoveCreditCardUseCase,
          useValue: removeCreditCardUseCase,
        },
      ],
    }).compile();

    controller = module.get<CreditCardsController>(CreditCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a credit card', async () => {
      const dto: CreateCreditCardDto = {
        name: 'Test Card',
        lastDigits: '1234',
        limit: 1000,
        closingDay: 5,
        dueDay: 10,
        color: '#fff',
        brand: CardBrand.VISA,
        isActive: true,
      };

      const result = { id: '1', ...dto };
      createCreditCardUseCase.execute.mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(createCreditCardUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of credit cards', async () => {
      const result = [{ id: '1', name: 'Card' }];
      findAllCreditCardsUseCase.execute.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(findAllCreditCardsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single credit card', async () => {
      const result = { id: '1', name: 'Card' };
      findCreditCardByIdUseCase.execute.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
      expect(findCreditCardByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a credit card', async () => {
      const dto: UpdateCreditCardDto = { name: 'Updated' };
      const result = { id: '1', name: 'Updated' };
      updateCreditCardUseCase.execute.mockResolvedValue({
        id: '1',
        dto: dto,
      });

      // Note: controller returns whatever use case returns.
      // Depending on implementation, it might differ. But assuming pass-through.
      // Wait, let's check controller implementation again.
      // return this.updateCreditCardUseCase.execute({ id, dto: updateCreditCardDto });
      // The mock should resolve to whatever the use case resolves to.

      updateCreditCardUseCase.execute.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(updateCreditCardUseCase.execute).toHaveBeenCalledWith({
        id: '1',
        dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a credit card', async () => {
      removeCreditCardUseCase.execute.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBe(undefined);
      expect(removeCreditCardUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
