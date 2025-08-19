import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';

export abstract class CrudRepository<T extends ObjectLiteral> {
  constructor(protected readonly repo: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    return this.repo.save(this.repo.create(data));
  }

  async findAll(): Promise<T[]> {
    return this.repo.find();
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repo.findOneBy(where);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T | null> {
    await this.repo.update(id, data as any);
    return this.findOne({ id } as any);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
