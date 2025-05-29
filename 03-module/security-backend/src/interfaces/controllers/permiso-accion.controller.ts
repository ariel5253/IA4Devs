import { Request, Response } from 'express';
import { PermisoAccionRepository } from '../../infrastructure/repositories/permiso-accion.repository';
import { CreatePermisoAccionDto, UpdatePermisoAccionDto, createPermisoAccionSchema, updatePermisoAccionSchema } from '../../dtos/permiso-accion.dto';
import { ZodError } from 'zod';

export class PermisoAccionController {
  private repository: PermisoAccionRepository;

  constructor() {
    this.repository = new PermisoAccionRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createPermisoAccionSchema.parse(req.body);
      const permisoAccion = await this.repository.create(validatedData);
      res.status(201).json(permisoAccion);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const permisoAcciones = await this.repository.findAll();
      res.json(permisoAcciones);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const permisoAccion = await this.repository.findById(id);
      
      if (!permisoAccion) {
        return res.status(404).json({ error: 'Permiso de acción no encontrado' });
      }
      
      res.json(permisoAccion);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByRolId(req: Request, res: Response) {
    try {
      const rolId = parseInt(req.params.rolId);
      const permisoAcciones = await this.repository.findByRolId(rolId);
      res.json(permisoAcciones);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByAccionVistaId(req: Request, res: Response) {
    try {
      const accionVistaId = parseInt(req.params.accionVistaId);
      const permisoAcciones = await this.repository.findByAccionVistaId(accionVistaId);
      res.json(permisoAcciones);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updatePermisoAccionSchema.parse(req.body);
      
      const permisoAccion = await this.repository.update(id, validatedData);
      
      if (!permisoAccion) {
        return res.status(404).json({ error: 'Permiso de acción no encontrado' });
      }
      
      res.json(permisoAccion);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const permisoAccion = await this.repository.delete(id);
      
      if (!permisoAccion) {
        return res.status(404).json({ error: 'Permiso de acción no encontrado' });
      }
      
      res.json({ message: 'Permiso de acción eliminado correctamente' });
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 