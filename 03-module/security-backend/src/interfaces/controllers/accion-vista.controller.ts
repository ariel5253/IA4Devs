import { Request, Response } from 'express';
import { AccionVistaRepository } from '../../infrastructure/repositories/accion-vista.repository';
import { CreateAccionVistaDto, UpdateAccionVistaDto, createAccionVistaSchema, updateAccionVistaSchema } from '../../dtos/accion-vista.dto';
import { ZodError } from 'zod';

export class AccionVistaController {
  private repository: AccionVistaRepository;

  constructor() {
    this.repository = new AccionVistaRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const validatedData = createAccionVistaSchema.parse(req.body);
      const accionVista = await this.repository.create(validatedData);
      res.status(201).json(accionVista);
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
      const accionVistas = await this.repository.findAll();
      res.json(accionVistas);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const accionVista = await this.repository.findById(id);
      
      if (!accionVista) {
        return res.status(404).json({ error: 'Acción de vista no encontrada' });
      }
      
      res.json(accionVista);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByVistaId(req: Request, res: Response) {
    try {
      const vistaId = parseInt(req.params.vistaId);
      const accionVistas = await this.repository.findByVistaId(vistaId);
      res.json(accionVistas);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByCodigo(req: Request, res: Response) {
    try {
      const { codigo } = req.params;
      const accionVista = await this.repository.findByCodigo(codigo);
      
      if (!accionVista) {
        return res.status(404).json({ error: 'Acción de vista no encontrada' });
      }
      
      res.json(accionVista);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateAccionVistaSchema.parse(req.body);
      
      const accionVista = await this.repository.update(id, validatedData);
      
      if (!accionVista) {
        return res.status(404).json({ error: 'Acción de vista no encontrada' });
      }
      
      res.json(accionVista);
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
      const accionVista = await this.repository.delete(id);
      
      if (!accionVista) {
        return res.status(404).json({ error: 'Acción de vista no encontrada' });
      }
      
      res.json({ message: 'Acción de vista eliminada correctamente' });
    } catch (error: unknown) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 