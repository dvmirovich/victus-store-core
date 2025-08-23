import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { BrandEntity } from 'src/database/entities/brand.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
