export class Rol {
  id?: number;
  nombre: string;
  descripcion?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    nombre: string;
    descripcion?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 