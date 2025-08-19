import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/features/auth/auth.module';
import { BrandsModule } from 'src/features/brands/brands.module';
import { BrandEntity } from 'src/features/brands/entities/brand.entity';
import { CartItemsModule } from 'src/features/carts/cart-items/cart-items.module';
import { CartItemEntity } from 'src/features/carts/cart-items/entities/cart-item.entity';
import { CategoriesModule } from 'src/features/categories/categories.module';
import { CategoryEntity } from 'src/features/categories/entities/category.entity';
import { OrderItemEntity } from 'src/features/orders/entities/order-item.entity';
import { OrderEntity } from 'src/features/orders/entities/order.entity';
import { OrdersModule } from 'src/features/orders/orders.module';
import { ProductPhotoEntity } from 'src/features/products/entities/product-photo.entity';
import { ProductReviewEntity } from 'src/features/products/entities/product-review.entity';
import { ProductEntity } from 'src/features/products/entities/product.entity';
import { ProductsModule } from 'src/features/products/products.module';
import { ShoppingCartEntity } from 'src/features/carts/shopping-cart/entities/shopping-cart.entity';
import { ShoppingCartModule } from 'src/features/carts/shopping-cart/shopping-cart.module';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { UsersModule } from 'src/features/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        entities: [
          BrandEntity,
          CartItemEntity,
          CategoryEntity,
          OrderEntity,
          OrderItemEntity,
          ProductEntity,
          ProductReviewEntity,
          ProductPhotoEntity,
          ShoppingCartEntity,
          UserEntity,
        ],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    BrandsModule,
    CartItemsModule,
    CategoriesModule,
    OrdersModule,
    ProductsModule,
    ShoppingCartModule,
    UsersModule,
  ],
})
export class AppModule {}
