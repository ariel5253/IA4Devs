import { PrismaClient } from '@prisma/client';
import { Modulo } from '../../domain/entities/modulo.entity';
import { CreateModuloDto, UpdateModuloDto } from '../../dtos/modulo.dto';

export class ModuloRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateModuloDto): Promise<Modulo> {
    const modulo = await this.prisma.modulo.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
      },
    });
    return new Modulo(modulo);
  }

  async findAll(): Promise<Modulo[]> {
    const modulos = await this.prisma.modulo.findMany();
    return modulos.map(modulo => new Modulo(modulo));
  }

  async findById(id: number): Promise<Modulo | null> {
    const modulo = await this.prisma.modulo.findUnique({
      where: { id },
    });
    return modulo ? new Modulo(modulo) : null;
  }

  async findByNombre(nombre: string): Promise<Modulo | null> {
    const modulo = await this.prisma.modulo.findUnique({
      where: { nombre },
    });
    return modulo ? new Modulo(modulo) : null;
  }

  async update(id: number, data: UpdateModuloDto): Promise<Modulo | null> {
    const modulo = await this.prisma.modulo.update({
      where: { id },
      data,
    });
    return new Modulo(modulo);
  }

  async delete(id: number): Promise<Modulo | null> {
    const modulo = await this.prisma.modulo.delete({
      where: { id },
    });
    return new Modulo(modulo);
  }
} 