import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductAttributeEntity } from './product-attribute.entity';
import { EAttributeSelectType } from 'src/infrastructure/enums/attribute-select-type.enum';
import { EAttributeCategory } from 'src/infrastructure/enums/attribute-category.enum';

@Entity('attributes')
export class AttributeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  displayName: string;

  @Column({
    type: 'enum',
    enum: EAttributeSelectType,
  })
  type: EAttributeSelectType;

  @Column({
    type: 'enum',
    enum: EAttributeCategory,
  })
  category: EAttributeCategory;

  @Column({ default: true })
  isFilterable: boolean;

  @Column({ default: true })
  isSearchable: boolean;

  @OneToMany(
    () => ProductAttributeEntity,
    (productAttribute) => productAttribute.attribute,
  )
  productAttributes: ProductAttributeEntity[];
}
