export class Vista {
  id?: number;
  nombre: string;
  descripcion?: string;
  ruta: string;
  icono?: string;
  moduloId: number;
  modulo?: {
    id: number;
    nombre: string;
    descripcion?: string;
  };
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    nombre: string;
    descripcion?: string;
    ruta: string;
    icono?: string;
    moduloId: number;
    modulo?: {
      id: number;
      nombre: string;
      descripcion?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.ruta = data.ruta;
    this.icono = data.icono;
    this.moduloId = data.moduloId;
    this.modulo = data.modulo;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      ruta: this.ruta,
      icono: this.icono,
      moduloId: this.moduloId,
      modulo: this.modulo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 