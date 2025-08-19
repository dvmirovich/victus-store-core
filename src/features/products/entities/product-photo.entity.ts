import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('productPhotos')
export class ProductPhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  thumbnailPath: string;

  @ManyToOne(() => ProductEntity, (product) => product.photos, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
