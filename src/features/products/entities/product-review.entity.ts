import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from 'src/features/users/entities/user.entity';

@Entity('reviews')
export class ProductReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  productId: number;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  userId: number;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
