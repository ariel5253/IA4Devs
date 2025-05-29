import { Request, Response } from 'express';
import { ModuloRepository } from '../../infrastructure/repositories/modulo.repository';
import { CreateModuloDto, UpdateModuloDto, createModuloSchema, updateModuloSchema } from '../../dtos/modulo.dto';
import { ZodError } from 'zod';

export class ModuloController {
  private repository: ModuloRepository;

  constructor() {
    this.repository = new ModuloRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createModuloSchema.parse(req.body);
      const modulo = await this.repository.create(validatedData);
      res.status(201).json(modulo);
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
      const modulos = await this.repository.findAll();
      res.json(modulos);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const modulo = await this.repository.findById(id);
      
      if (!modulo) {
        return res.status(404).json({ error: 'Módulo no encontrado' });
      }
      
      res.json(modulo);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateModuloSchema.parse(req.body);
      
      const modulo = await this.repository.update(id, validatedData);
      
      if (!modulo) {
        return res.status(404).json({ error: 'Módulo no encontrado' });
      }
      
      res.json(modulo);
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
      const modulo = await this.repository.delete(id);
      
      if (!modulo) {
        return res.status(404).json({ error: 'Módulo no encontrado' });
      }
      
      res.json({ message: 'Módulo eliminado correctamente' });
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 