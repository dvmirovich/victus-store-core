import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemEntity } from 'src/infrastructure/database/entities/cart-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItemEntity)
    private _crudRepo: Repository<CartItemEntity>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    this._crudRepo.create(createCartItemDto);
    return this._crudRepo.save(createCartItemDto);
  }

  async findAll() {
    return this._crudRepo.find();
  }

  async findOne(id: number) {
    return this._crudRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return this._crudRepo.update(id, updateCartItemDto);
  }

  remove(id: number) {
    return this._crudRepo.delete(id);
  }
}
