import { Request, Response } from 'express';
import { ModuloRolRepository } from '../../infrastructure/repositories/modulo-rol.repository';
import { CreateModuloRolDto, UpdateModuloRolDto, createModuloRolSchema, updateModuloRolSchema } from '../../dtos/modulo-rol.dto';
import { ZodError } from 'zod';

export class ModuloRolController {
  private repository: ModuloRolRepository;

  constructor() {
    this.repository = new ModuloRolRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createModuloRolSchema.parse(req.body);
      const moduloRol = await this.repository.create(validatedData);
      res.status(201).json(moduloRol);
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
      const moduloRoles = await this.repository.findAll();
      res.json(moduloRoles);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const moduloRol = await this.repository.findById(id);
      
      if (!moduloRol) {
        return res.status(404).json({ error: 'Relación módulo-rol no encontrada' });
      }
      
      res.json(moduloRol);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByModuloId(req: Request, res: Response) {
    try {
      const moduloId = parseInt(req.params.moduloId);
      const moduloRoles = await this.repository.findByModuloId(moduloId);
      res.json(moduloRoles);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByRolId(req: Request, res: Response) {
    try {
      const rolId = parseInt(req.params.rolId);
      const moduloRoles = await this.repository.findByRolId(rolId);
      res.json(moduloRoles);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateModuloRolSchema.parse(req.body);
      
      const moduloRol = await this.repository.update(id, validatedData);
      
      if (!moduloRol) {
        return res.status(404).json({ error: 'Relación módulo-rol no encontrada' });
      }
      
      res.json(moduloRol);
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
      const moduloRol = await this.repository.delete(id);
      
      if (!moduloRol) {
        return res.status(404).json({ error: 'Relación módulo-rol no encontrada' });
      }
      
      res.json({ message: 'Relación módulo-rol eliminada correctamente' });
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 