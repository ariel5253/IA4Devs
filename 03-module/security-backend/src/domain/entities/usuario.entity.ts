export class Usuario {
  id?: number;
  username: string;
  password: string;
  personaId: number;
  rolId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    username: string;
    password: string;
    personaId: number;
    rolId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.personaId = data.personaId;
    this.rolId = data.rolId;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      personaId: this.personaId,
      rolId: this.rolId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 