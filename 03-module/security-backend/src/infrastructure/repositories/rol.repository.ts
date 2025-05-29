import { PrismaClient } from '@prisma/client';
import { Rol } from '../../domain/entities/rol.entity';
import { CreateRolDto, UpdateRolDto } from '../../dtos/rol.dto';

export class RolRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateRolDto): Promise<Rol> {
    const rol = await this.prisma.rol.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
      },
    });
    return new Rol(rol);
  }

  async findAll(): Promise<Rol[]> {
    const roles = await this.prisma.rol.findMany();
    return roles.map(rol => new Rol(rol));
  }

  async findById(id: number): Promise<Rol | null> {
    const rol = await this.prisma.rol.findUnique({
      where: { id },
    });
    return rol ? new Rol(rol) : null;
  }

  async findByNombre(nombre: string): Promise<Rol | null> {
    const rol = await this.prisma.rol.findUnique({
      where: { nombre },
    });
    return rol ? new Rol(rol) : null;
  }

  async update(id: number, data: UpdateRolDto): Promise<Rol | null> {
    const rol = await this.prisma.rol.update({
      where: { id },
      data,
    });
    return new Rol(rol);
  }

  async delete(id: number): Promise<Rol | null> {
    const rol = await this.prisma.rol.delete({
      where: { id },
    });
    return new Rol(rol);
  }
} 