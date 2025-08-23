import { dataSourceOptions } from '../infrastructure/database/data-source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/features/auth/auth.module';
import { BrandsModule } from 'src/features/brands/brands.module';
import { CartItemsModule } from 'src/features/carts/cart-items/cart-items.module';
import { CategoriesModule } from 'src/features/categories/categories.module';
import { OrdersModule } from 'src/features/orders/orders.module';
import { ProductsModule } from 'src/features/products/products.module';
import { ShoppingCartModule } from 'src/features/carts/shopping-cart/shopping-cart.module';
import { UsersModule } from 'src/features/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
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
