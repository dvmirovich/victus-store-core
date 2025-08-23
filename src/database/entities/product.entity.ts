import { BrandEntity } from 'src/database/entities/brand.entity';
import { CategoryEntity } from 'src/database/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ProductPhotoEntity } from './product-photo.entity';
import { ProductReviewEntity } from './product-review.entity';
import { OrderItemEntity } from './order-item.entity';
import { CartItemEntity } from './cart-item.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true, name: 'old_price' })
  oldPrice: number;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => BrandEntity, (brand) => brand.products, { nullable: false })
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ProductPhotoEntity, (photo) => photo.product, {
    cascade: true,
  })
  photos: ProductPhotoEntity[];

  @OneToMany(() => ProductReviewEntity, (review) => review.product)
  reviews: ProductReviewEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItems: CartItemEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
