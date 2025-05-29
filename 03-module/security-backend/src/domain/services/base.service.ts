import { BaseRepository } from '../repositories/base.repository';

export abstract class BaseService<T, D, S> {
  constructor(protected readonly repository: BaseRepository<T, D, S>) {}

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<T | null> {
    return this.repository.findById(id);
  }

  async create(data: D): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: number, data: S): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<T> {
    return this.repository.delete(id);
  }

  async findOne(where: Partial<T>): Promise<T | null> {
    return this.repository.findOne(where);
  }
} 