import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderStatus } from 'src/features/orders/enums/order.enum';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    nullable: false,
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({ nullable: false, name: 'total_price' })
  totalPrice: number;

  @Column({ nullable: false, name: 'shipping_address' })
  shippingAddress: string;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items: OrderItemEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
