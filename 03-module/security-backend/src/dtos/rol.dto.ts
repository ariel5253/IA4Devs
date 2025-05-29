import { z } from 'zod';

export const createRolSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().optional(),
});

export const updateRolSchema = createRolSchema.partial();

export type CreateRolDto = z.infer<typeof createRolSchema>;
export type UpdateRolDto = z.infer<typeof updateRolSchema>; 