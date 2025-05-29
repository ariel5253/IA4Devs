import { Request, Response } from 'express';
import { UsuarioRepository } from '../../infrastructure/repositories/usuario.repository';
import { CreateUsuarioDto, UpdateUsuarioDto, createUsuarioSchema, updateUsuarioSchema } from '../../dtos/usuario.dto';
import { ZodError } from 'zod';

export class UsuarioController {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createUsuarioSchema.parse(req.body);
      const usuario = await this.repository.create(validatedData);
      res.status(201).json(usuario);
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
      const usuarios = await this.repository.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const usuario = await this.repository.findById(id);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateUsuarioSchema.parse(req.body);
      
      const usuario = await this.repository.update(id, validatedData);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      res.json(usuario);
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
      const usuario = await this.repository.delete(id);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 