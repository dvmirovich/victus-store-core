import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/features/products/entities/product.entity';

@Entity('orderItems')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.id, {
    onDelete: 'CASCADE',
  })
  order: number;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  product: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
