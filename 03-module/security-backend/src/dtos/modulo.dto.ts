import { z } from 'zod';

export const createModuloSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().optional(),
});

export const updateModuloSchema = createModuloSchema.partial();

export type CreateModuloDto = z.infer<typeof createModuloSchema>;
export type UpdateModuloDto = z.infer<typeof updateModuloSchema>; 