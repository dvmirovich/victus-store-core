import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from 'src/database/entities/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity])],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
