export class VistaModulo {
  id?: number;
  vistaId: number;
  moduloId: number;
  orden: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    vistaId: number;
    moduloId: number;
    orden: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.vistaId = data.vistaId;
    this.moduloId = data.moduloId;
    this.orden = data.orden;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      vistaId: this.vistaId,
      moduloId: this.moduloId,
      orden: this.orden,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 