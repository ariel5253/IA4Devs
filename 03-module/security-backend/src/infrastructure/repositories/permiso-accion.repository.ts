import { PrismaClient, Permiso as PrismaPermiso } from '@prisma/client';
import { PermisoAccion } from '../../domain/entities/permiso-accion.entity';
import { CreatePermisoAccionDto, UpdatePermisoAccionDto } from '../../dtos/permiso-accion.dto';

export class PermisoAccionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreatePermisoAccionDto): Promise<PermisoAccion> {
    const permisoAccion = await this.prisma.permiso.create({
      data: {
        rolId: data.rolId,
        accionVistaId: data.accionVistaId,
        permitido: data.permitido,
      },
      include: {
        rol: true,
        accionVista: {
          include: {
            vista: true,
          },
        },
      },
    });
    return new PermisoAccion(permisoAccion);
  }

  async findAll(): Promise<PermisoAccion[]> {
    const permisoAcciones = await this.prisma.permiso.findMany({
      include: {
        rol: true,
        accionVista: {
          include: {
            vista: true,
          },
        },
      },
    });
    return permisoAcciones.map((permisoAccion: PrismaPermiso & { rol: any; accionVista: any }) => new PermisoAccion(permisoAccion));
  }

  async findById(id: number): Promise<PermisoAccion | null> {
    const permisoAccion = await this.prisma.permiso.findUnique({
      where: { id },
      include: {
        rol: true,
        accionVista: {
          include: {
            vista: true,
          },
        },
      },
    });
    return permisoAccion ? new PermisoAccion(permisoAccion) : null;
  }

  async findByRolId(rolId: number): Promise<PermisoAccion[]> {
    const permisoAcciones = await this.prisma.permiso.findMany({
      where: { rolId },
      include: {
        rol: true,
        accionVista: {
          include: {
            vista: true,
          },
        },
      },
    });
    return permisoAcciones.map((permisoAccion: PrismaPermiso & { rol: any; accionVista: any }) => new PermisoAccion(permisoAccion));
  }

  async findByAccionVistaId(accionVistaId: number): Promise<PermisoAccion[]> {
    const permisoAcciones = await this.prisma.permiso.findMany({
      where: { accionVistaId },
      include: {
        rol: true,
        accionVista: {
          include: {
            vista: true,
          },
        },
      },
    });
    return permisoAcciones.map((permisoAccion: PrismaPermiso & { rol: any; accionVista: any }) => new PermisoAccion(permisoAccion));
  }

  async update(id: number, data: UpdatePermisoAccionDto): Promise<PermisoAccion | null> {
    const permisoAccion = await this.prisma.permiso.update({
      where: { id },
      data,
      include: {
        rol: true,
        accionVista: {
          include: {
            vista: true,
          },
        },
      },
    });
    return new PermisoAccion(permisoAccion);
  }

  async delete(id: number): Promise<PermisoAccion | null> {
    const permisoAccion = await this.prisma.permiso.delete({
      where: { id },
      include: {
        rol: true,
        accionVista: {
          include: {
            vista: true,
          },
        },
      },
    });
    return new PermisoAccion(permisoAccion);
  }
} 