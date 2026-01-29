import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Category } from '../../categories/entities/category.entity';
import { Account } from '../../accounts/entities/account.entity';
import { CreditCard } from '../../credit-cards/entities/credit-card.entity';
import { RecurringTransaction } from '../../recurring/entities/recurring.entity';
import { ColumnNumericTransformer } from '../../../common/transformers/numeric.transformer';
import { TransactionType } from '../../../enums/transaction-type.enum';
import { PaymentMethod } from '../../../enums/payment-method.enum';
import { TransactionStatus } from '../../../enums/transaction-status.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.EXPENSE,
  })
  type: TransactionType;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.PIX,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PAID,
  })
  status: TransactionStatus;

  @Column({ nullable: true })
  cardId: string;

  @ManyToOne(() => CreditCard, { nullable: true })
  @JoinColumn({ name: 'cardId' })
  card: CreditCard;

  @Column({ nullable: true })
  bankAccountId: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'bankAccountId' })
  bankAccount: Account;

  @Column({ nullable: true })
  isRecurring: boolean;

  @Column({ nullable: true })
  recurringId: string;

  @ManyToOne(() => RecurringTransaction, { nullable: true })
  @JoinColumn({ name: 'recurringId' })
  recurring: RecurringTransaction;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
