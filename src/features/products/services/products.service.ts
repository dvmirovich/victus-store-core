import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/infrastructure/database/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private _crudRepo: Repository<ProductEntity>,
  ) {}

  create(createProductDto: CreateProductDto) {
    this._crudRepo.create(createProductDto);
    return this._crudRepo.save(createProductDto);
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return this._crudRepo.update(id, updateProductDto);
  }

  remove(id: number) {
    return this._crudRepo.delete(id);
  }
}
