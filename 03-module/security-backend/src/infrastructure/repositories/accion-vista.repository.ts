import { PrismaClient, AccionVista as PrismaAccionVista } from '@prisma/client';
import { AccionVista } from '../../domain/entities/accion-vista.entity';
import { CreateAccionVistaDto, UpdateAccionVistaDto } from '../../dtos/accion-vista.dto';

export class AccionVistaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateAccionVistaDto): Promise<AccionVista> {
    const accionVista = await this.prisma.accionVista.create({
      data: {
        vistaId: data.vistaId,
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
      },
      include: {
        vista: true,
      },
    });
    return new AccionVista(accionVista);
  }

  async findAll(): Promise<AccionVista[]> {
    const accionVistas = await this.prisma.accionVista.findMany({
      include: {
        vista: true,
      },
    });
    return accionVistas.map((accionVista: PrismaAccionVista & { vista: any }) => new AccionVista(accionVista));
  }

  async findById(id: number): Promise<AccionVista | null> {
    const accionVista = await this.prisma.accionVista.findUnique({
      where: { id },
      include: {
        vista: true,
      },
    });
    return accionVista ? new AccionVista(accionVista) : null;
  }

  async findByVistaId(vistaId: number): Promise<AccionVista[]> {
    const accionVistas = await this.prisma.accionVista.findMany({
      where: { vistaId },
      include: {
        vista: true,
      },
    });
    return accionVistas.map((accionVista: PrismaAccionVista & { vista: any }) => new AccionVista(accionVista));
  }

  async findByCodigo(codigo: string): Promise<AccionVista | null> {
    const accionVista = await this.prisma.accionVista.findUnique({
      where: { codigo },
      include: {
        vista: true,
      },
    });
    return accionVista ? new AccionVista(accionVista) : null;
  }

  async update(id: number, data: UpdateAccionVistaDto): Promise<AccionVista | null> {
    const accionVista = await this.prisma.accionVista.update({
      where: { id },
      data,
      include: {
        vista: true,
      },
    });
    return new AccionVista(accionVista);
  }

  async delete(id: number): Promise<AccionVista | null> {
    const accionVista = await this.prisma.accionVista.delete({
      where: { id },
      include: {
        vista: true,
      },
    });
    return new AccionVista(accionVista);
  }
} 