import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { AttributeEntity } from './attribute.entity';
import { ProductEntity } from './product.entity';

@Entity('product_attributes')
@Index(['productId', 'attributeId'], { unique: true })
export class ProductAttributeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  attributeId: number;

  @Column('text')
  value: string;

  @Column('text', { nullable: true })
  normalizedValue: string;

  @ManyToOne(() => ProductEntity, (product) => product.attributes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ManyToOne(
    () => AttributeEntity,
    (attribute) => attribute.productAttributes,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'attributeId' })
  attribute: AttributeEntity;
}
