import { Request, Response } from 'express';
import { VistaModuloRepository } from '../../infrastructure/repositories/vista-modulo.repository';
import { CreateVistaModuloDto, UpdateVistaModuloDto, createVistaModuloSchema, updateVistaModuloSchema } from '../../dtos/vista-modulo.dto';
import { ZodError } from 'zod';

export class VistaModuloController {
  private repository: VistaModuloRepository;

  constructor() {
    this.repository = new VistaModuloRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createVistaModuloSchema.parse(req.body);
      const vistaModulo = await this.repository.create(validatedData);
      res.status(201).json(vistaModulo);
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
      const vistaModulos = await this.repository.findAll();
      res.json(vistaModulos);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const vistaModulo = await this.repository.findById(id);
      
      if (!vistaModulo) {
        return res.status(404).json({ error: 'Relación vista-módulo no encontrada' });
      }
      
      res.json(vistaModulo);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByVistaId(req: Request, res: Response) {
    try {
      const vistaId = parseInt(req.params.vistaId);
      const vistaModulos = await this.repository.findByVistaId(vistaId);
      res.json(vistaModulos);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByModuloId(req: Request, res: Response) {
    try {
      const moduloId = parseInt(req.params.moduloId);
      const vistaModulos = await this.repository.findByModuloId(moduloId);
      res.json(vistaModulos);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateVistaModuloSchema.parse(req.body);
      
      const vistaModulo = await this.repository.update(id, validatedData);
      
      if (!vistaModulo) {
        return res.status(404).json({ error: 'Relación vista-módulo no encontrada' });
      }
      
      res.json(vistaModulo);
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
      const vistaModulo = await this.repository.delete(id);
      
      if (!vistaModulo) {
        return res.status(404).json({ error: 'Relación vista-módulo no encontrada' });
      }
      
      res.json({ message: 'Relación vista-módulo eliminada correctamente' });
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 