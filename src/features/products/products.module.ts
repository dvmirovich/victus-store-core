import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from 'src/database/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReviewEntity } from 'src/database/entities/product-review.entity';
import { ProductPhotoEntity } from 'src/database/entities/product-photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductReviewEntity,
      ProductPhotoEntity,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
