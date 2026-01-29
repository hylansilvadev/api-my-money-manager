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
import { Account } from '../../accounts/entities/account.entity';
import { ColumnNumericTransformer } from '../../../common/transformers/numeric.transformer';
import { CardBrand } from '../../../enums/card-brand.enum';

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastDigits: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  limit: number;

  @Column()
  closingDay: number;

  @Column()
  dueDay: number;

  @Column()
  color: string;

  @Column({
    type: 'enum',
    enum: CardBrand,
    default: CardBrand.VISA,
  })
  brand: CardBrand;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  bankAccountId: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'bankAccountId' })
  bankAccount: Account;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
