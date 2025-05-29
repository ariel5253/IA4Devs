import { PrismaClient } from '@prisma/client';
import { VistaModulo } from '../../domain/entities/vista-modulo.entity';
import { CreateVistaModuloDto, UpdateVistaModuloDto } from '../../dtos/vista-modulo.dto';

export class VistaModuloRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateVistaModuloDto): Promise<VistaModulo> {
    const vistaModulo = await this.prisma.vistaModulo.create({
      data: {
        vistaId: data.vistaId,
        moduloId: data.moduloId,
        orden: data.orden,
      },
    });
    return new VistaModulo(vistaModulo);
  }

  async findAll(): Promise<VistaModulo[]> {
    const vistaModulos = await this.prisma.vistaModulo.findMany({
      include: {
        vista: true,
        modulo: true,
      },
    });
    return vistaModulos.map((vistaModulo) => new VistaModulo(vistaModulo));
  }

  async findById(id: number): Promise<VistaModulo | null> {
    const vistaModulo = await this.prisma.vistaModulo.findUnique({
      where: { id },
      include: {
        vista: true,
        modulo: true,
      },
    });
    return vistaModulo ? new VistaModulo(vistaModulo) : null;
  }

  async findByVistaId(vistaId: number): Promise<VistaModulo[]> {
    const vistaModulos = await this.prisma.vistaModulo.findMany({
      where: { vistaId },
      include: {
        vista: true,
        modulo: true,
      },
    });
    return vistaModulos.map((vistaModulo) => new VistaModulo(vistaModulo));
  }

  async findByModuloId(moduloId: number): Promise<VistaModulo[]> {
    const vistaModulos = await this.prisma.vistaModulo.findMany({
      where: { moduloId },
      include: {
        vista: true,
        modulo: true,
      },
    });
    return vistaModulos.map((vistaModulo) => new VistaModulo(vistaModulo));
  }

  async update(id: number, data: UpdateVistaModuloDto): Promise<VistaModulo | null> {
    const vistaModulo = await this.prisma.vistaModulo.update({
      where: { id },
      data,
      include: {
        vista: true,
        modulo: true,
      },
    });
    return new VistaModulo(vistaModulo);
  }

  async delete(id: number): Promise<VistaModulo | null> {
    const vistaModulo = await this.prisma.vistaModulo.delete({
      where: { id },
      include: {
        vista: true,
        modulo: true,
      },
    });
    return new VistaModulo(vistaModulo);
  }
} 