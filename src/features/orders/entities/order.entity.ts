import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order.enum';
import { UserEntity } from 'src/features/users/entities/user.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({ nullable: false })
  totalPrice: number;

  @Column({ nullable: false })
  shippingAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
