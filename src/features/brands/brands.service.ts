import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/infrastructure/database/entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private _crudRepo: Repository<BrandEntity>,
  ) {}

  create(createBrandDto: CreateBrandDto) {
    this._crudRepo.create(createBrandDto);
    return this._crudRepo.save(createBrandDto);
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

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this._crudRepo.update(id, updateBrandDto);
  }

  remove(id: number) {
    return this._crudRepo.delete(id);
  }
}
