export class Persona {
  id?: number;
  nombre: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    nombre: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.email = data.email;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 