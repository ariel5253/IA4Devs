export class ModuloRol {
  id?: number;
  moduloId: number;
  rolId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    moduloId: number;
    rolId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.moduloId = data.moduloId;
    this.rolId = data.rolId;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      moduloId: this.moduloId,
      rolId: this.rolId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 