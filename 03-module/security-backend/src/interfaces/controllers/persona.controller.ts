import { Request, Response } from 'express';
import { PersonaRepository } from '../../infrastructure/repositories/persona.repository';
import { CreatePersonaDto, UpdatePersonaDto, createPersonaSchema, updatePersonaSchema } from '../../dtos/persona.dto';
import { ZodError } from 'zod';

export class PersonaController {
  private repository: PersonaRepository;

  constructor() {
    this.repository = new PersonaRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createPersonaSchema.parse(req.body);
      const persona = await this.repository.create(validatedData);
      res.status(201).json(persona);
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
      const personas = await this.repository.findAll();
      res.json(personas);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const persona = await this.repository.findById(id);
      
      if (!persona) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }
      
      res.json(persona);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updatePersonaSchema.parse(req.body);
      
      const persona = await this.repository.update(id, validatedData);
      
      if (!persona) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }
      
      res.json(persona);
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
      const persona = await this.repository.delete(id);
      
      if (!persona) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }
      
      res.json({ message: 'Persona eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 