import { PrismaClient } from '@prisma/client';
import { ModuloRol } from '../../domain/entities/modulo-rol.entity';
import { CreateModuloRolDto, UpdateModuloRolDto } from '../../dtos/modulo-rol.dto';

export class ModuloRolRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateModuloRolDto): Promise<ModuloRol> {
    const moduloRol = await this.prisma.moduloRol.create({
      data: {
        moduloId: data.moduloId,
        rolId: data.rolId,
      },
      include: {
        modulo: true,
        rol: true,
      },
    });
    return new ModuloRol(moduloRol);
  }

  async findAll(): Promise<ModuloRol[]> {
    const moduloRoles = await this.prisma.moduloRol.findMany({
      include: {
        modulo: true,
        rol: true,
      },
    });
    return moduloRoles.map((moduloRol) => new ModuloRol(moduloRol));
  }

  async findById(id: number): Promise<ModuloRol | null> {
    const moduloRol = await this.prisma.moduloRol.findUnique({
      where: { id },
      include: {
        modulo: true,
        rol: true,
      },
    });
    return moduloRol ? new ModuloRol(moduloRol) : null;
  }

  async findByModuloId(moduloId: number): Promise<ModuloRol[]> {
    const moduloRoles = await this.prisma.moduloRol.findMany({
      where: { moduloId },
      include: {
        modulo: true,
        rol: true,
      },
    });
    return moduloRoles.map((moduloRol) => new ModuloRol(moduloRol));
  }

  async findByRolId(rolId: number): Promise<ModuloRol[]> {
    const moduloRoles = await this.prisma.moduloRol.findMany({
      where: { rolId },
      include: {
        modulo: true,
        rol: true,
      },
    });
    return moduloRoles.map((moduloRol) => new ModuloRol(moduloRol));
  }

  async update(id: number, data: UpdateModuloRolDto): Promise<ModuloRol | null> {
    const moduloRol = await this.prisma.moduloRol.update({
      where: { id },
      data,
      include: {
        modulo: true,
        rol: true,
      },
    });
    return new ModuloRol(moduloRol);
  }

  async delete(id: number): Promise<ModuloRol | null> {
    const moduloRol = await this.prisma.moduloRol.delete({
      where: { id },
      include: {
        modulo: true,
        rol: true,
      },
    });
    return new ModuloRol(moduloRol);
  }
} 