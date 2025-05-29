import { PrismaClient } from '@prisma/client';
import { Vista } from '../../domain/entities/vista.entity';
import { CreateVistaDto, UpdateVistaDto } from '../../dtos/vista.dto';

export class VistaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateVistaDto): Promise<Vista> {
    const vista = await this.prisma.vista.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        ruta: data.ruta,
        icono: data.icono,
        moduloId: data.moduloId,
      },
      include: {
        modulo: true,
      },
    });
    return new Vista(vista);
  }

  async findAll(): Promise<Vista[]> {
    const vistas = await this.prisma.vista.findMany({
      include: {
        modulo: true,
      },
    });
    return vistas.map((vista) => new Vista(vista));
  }

  async findById(id: number): Promise<Vista | null> {
    const vista = await this.prisma.vista.findUnique({
      where: { id },
      include: {
        modulo: true,
      },
    });
    return vista ? new Vista(vista) : null;
  }

  async findByNombre(nombre: string): Promise<Vista | null> {
    const vista = await this.prisma.vista.findUnique({
      where: { nombre },
      include: {
        modulo: true,
      },
    });
    return vista ? new Vista(vista) : null;
  }

  async findByRuta(ruta: string): Promise<Vista | null> {
    const vista = await this.prisma.vista.findUnique({
      where: { ruta },
      include: {
        modulo: true,
      },
    });
    return vista ? new Vista(vista) : null;
  }

  async update(id: number, data: UpdateVistaDto): Promise<Vista | null> {
    const vista = await this.prisma.vista.update({
      where: { id },
      data,
      include: {
        modulo: true,
      },
    });
    return new Vista(vista);
  }

  async delete(id: number): Promise<Vista | null> {
    const vista = await this.prisma.vista.delete({
      where: { id },
      include: {
        modulo: true,
      },
    });
    return new Vista(vista);
  }
} 