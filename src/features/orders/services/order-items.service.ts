import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemEntity } from 'src/database/entities/order-item.entity';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private _crudRepo: Repository<OrderItemEntity>,
  ) {}

  create(createOrderItemDto: CreateOrderItemDto) {
    this._crudRepo.create(createOrderItemDto);
    return this._crudRepo.save(createOrderItemDto);
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

  update(id: number, updateOrderItemDto: CreateOrderItemDto) {
    return this._crudRepo.update(id, updateOrderItemDto);
  }

  remove(id: number) {
    return this._crudRepo.delete(id);
  }
}
