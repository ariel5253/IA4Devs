export class PermisoAccion {
  id?: number;
  rolId: number;
  accionVistaId: number;
  permitido: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    rolId: number;
    accionVistaId: number;
    permitido: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.rolId = data.rolId;
    this.accionVistaId = data.accionVistaId;
    this.permitido = data.permitido;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      rolId: this.rolId,
      accionVistaId: this.accionVistaId,
      permitido: this.permitido,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 