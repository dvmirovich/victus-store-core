import { BrandEntity } from 'src/features/brands/entities/brand.entity';
import { CategoryEntity } from 'src/features/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductPhotoEntity } from './product-photo.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  oldPrice: number;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => BrandEntity, (brand) => brand.id, { nullable: false })
  brandId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    nullable: false,
  })
  categoryId: number;

  @OneToMany(() => ProductPhotoEntity, (photo) => photo.product, {
    cascade: true,
  })
  photos: ProductPhotoEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
