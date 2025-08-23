import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from 'src/infrastructure/database/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private _crudRepo: Repository<OrderEntity>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    this._crudRepo.create(createOrderDto);
    return this._crudRepo.save(createOrderDto);
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this._crudRepo.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this._crudRepo.delete(id);
  }
}
