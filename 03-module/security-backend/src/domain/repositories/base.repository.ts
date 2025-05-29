export interface BaseRepository<T, D, S> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: D): Promise<T>;
  update(id: number, data: S): Promise<T>;
  delete(id: number): Promise<T>;
  findOne(where: Partial<T>): Promise<T | null>;
} 