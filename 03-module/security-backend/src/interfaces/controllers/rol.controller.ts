import { Request, Response } from 'express';
import { RolRepository } from '../../infrastructure/repositories/rol.repository';
import { CreateRolDto, UpdateRolDto, createRolSchema, updateRolSchema } from '../../dtos/rol.dto';
import { ZodError } from 'zod';

export class RolController {
  private repository: RolRepository;

  constructor() {
    this.repository = new RolRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createRolSchema.parse(req.body);
      const rol = await this.repository.create(validatedData);
      res.status(201).json(rol);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const roles = await this.repository.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const rol = await this.repository.findById(id);
      
      if (!rol) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }
      
      res.json(rol);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateRolSchema.parse(req.body);
      
      const rol = await this.repository.update(id, validatedData);
      
      if (!rol) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }
      
      res.json(rol);
    } catch (error) {
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
      const rol = await this.repository.delete(id);
      
      if (!rol) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }
      
      res.json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 