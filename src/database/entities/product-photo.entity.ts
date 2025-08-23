import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('productPhotos')
export class ProductPhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({ name: 'thumbnail_path' })
  thumbnailPath: string;

  @ManyToOne(() => ProductEntity, (product) => product.photos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
