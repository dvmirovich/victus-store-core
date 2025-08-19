import { ProductEntity } from 'src/features/products/entities/product.entity';
import { ShoppingCartEntity } from 'src/features/carts/shopping-cart/entities/shopping-cart.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cartItem')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoppingCartEntity, (cart) => cart.id, {
    onDelete: 'CASCADE',
  })
  cartId: number;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  productId: number;

  @Column({ nullable: false })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
