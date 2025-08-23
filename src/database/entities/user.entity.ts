import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/features/users/enums/user-role.enum';
import { ShoppingCartEntity } from './shopping-cart.entity';
import { ProductReviewEntity } from './product-review.entity';
import { OrderEntity } from './order.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, name: 'phone_number' })
  phoneNumber: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ nullable: false, name: 'last_name' })
  lastName: string;

  @Column({
    enum: UserRole,
    type: 'enum',
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'text', nullable: true, name: 'refresh_token' })
  refreshToken?: string | null;

  @OneToMany(() => ShoppingCartEntity, (shoppingCard) => shoppingCard.user)
  shoppingCard: ShoppingCartEntity[];

  @OneToMany(() => ProductReviewEntity, (review) => review.user)
  reviews: ProductReviewEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
