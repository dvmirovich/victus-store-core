import { CreateProductReviewDto } from './../dto/create-product-review.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReviewEntity } from 'src/infrastructure/database/entities/product-review.entity';
import { UpdateProductReviewDto } from '../dto/update-product-review.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductReviewEntity)
    private _crudRepo: Repository<ProductReviewEntity>,
  ) {}

  create(createProductReviewDto: CreateProductReviewDto) {
    this._crudRepo.create();
    return this._crudRepo.save(createProductReviewDto);
  }

  findAll() {
    return this._crudRepo.find();
  }

  findOne(id: number) {
    return this._crudRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateProductReviewDto: UpdateProductReviewDto) {
    return this._crudRepo.update(id, updateProductReviewDto);
  }

  remove(id: number) {
    return this._crudRepo.delete(id);
  }
}
