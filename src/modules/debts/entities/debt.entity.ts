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
import { Creditor } from '../../creditors/entities/creditor.entity';
import { ColumnNumericTransformer } from '../../../common/transformers/numeric.transformer';
import { DebtStatus } from '../../../enums/debt-status.enum';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  creditorId: string;

  @ManyToOne(() => Creditor)
  @JoinColumn({ name: 'creditorId' })
  creditor: Creditor;

  @Column()
  description: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  totalAmount: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  remainingAmount: number;

  @Column()
  dueDate: Date;

  @Column({
    type: 'enum',
    enum: DebtStatus,
    default: DebtStatus.PENDING,
  })
  status: DebtStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
