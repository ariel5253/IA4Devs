export class AccionVista {
  id?: number;
  vistaId: number;
  nombre: string;
  descripcion?: string;
  codigo: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    vistaId: number;
    nombre: string;
    descripcion?: string;
    codigo: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.vistaId = data.vistaId;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.codigo = data.codigo;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      vistaId: this.vistaId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      codigo: this.codigo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 