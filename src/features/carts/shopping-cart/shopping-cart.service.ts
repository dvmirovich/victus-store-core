import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartEntity } from 'src/infrastructure/database/entities/shopping-cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCartEntity)
    private _crudRepo: Repository<ShoppingCartEntity>,
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    this._crudRepo.create(createShoppingCartDto);
    return this._crudRepo.save(createShoppingCartDto);
  }

  async findAll() {
    return this._crudRepo.find();
  }

  findOne(id: number) {
    return this._crudRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return this._crudRepo.update(id, updateShoppingCartDto);
  }

  remove(id: number) {
    return this._crudRepo.delete(id);
  }
}
