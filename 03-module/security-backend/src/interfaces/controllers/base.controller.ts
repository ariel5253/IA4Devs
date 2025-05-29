import { Request, Response } from 'express';
import { BaseService } from '../../domain/services/base.service';

export abstract class BaseController<T, D, S> {
  constructor(protected readonly service: BaseService<T, D, S>) {}

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving items', error });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await this.service.findById(id);
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving item', error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await this.service.create(req.body as D);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error creating item', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await this.service.update(id, req.body as S);
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error updating item', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const item = await this.service.delete(id);
      if (!item) {
        res.status(404).json({ message: 'Item not found' });
        return;
      }
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item', error });
    }
  }
} 