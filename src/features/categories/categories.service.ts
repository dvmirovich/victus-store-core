import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private _crudRepo: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    this._crudRepo.create(createCategoryDto);
    return this._crudRepo.save(createCategoryDto);
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this._crudRepo.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this._crudRepo.delete(id);
  }
}
