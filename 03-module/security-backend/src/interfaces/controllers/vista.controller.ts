import { Request, Response } from 'express';
import { VistaRepository } from '../../infrastructure/repositories/vista.repository';
import { CreateVistaDto, UpdateVistaDto, createVistaSchema, updateVistaSchema } from '../../dtos/vista.dto';
import { ZodError } from 'zod';

export class VistaController {
  private repository: VistaRepository;

  constructor() {
    this.repository = new VistaRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createVistaSchema.parse(req.body);
      const vista = await this.repository.create(validatedData);
      res.status(201).json(vista);
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
      const vistas = await this.repository.findAll();
      res.json(vistas);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const vista = await this.repository.findById(id);
      
      if (!vista) {
        return res.status(404).json({ error: 'Vista no encontrada' });
      }
      
      res.json(vista);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateVistaSchema.parse(req.body);
      
      const vista = await this.repository.update(id, validatedData);
      
      if (!vista) {
        return res.status(404).json({ error: 'Vista no encontrada' });
      }
      
      res.json(vista);
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
      const vista = await this.repository.delete(id);
      
      if (!vista) {
        return res.status(404).json({ error: 'Vista no encontrada' });
      }
      
      res.json({ message: 'Vista eliminada correctamente' });
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 