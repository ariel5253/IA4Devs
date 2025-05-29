import { z } from 'zod';

export const createModuloRolSchema = z.object({
  moduloId: z.number().int('El ID de módulo debe ser un número entero'),
  rolId: z.number().int('El ID de rol debe ser un número entero'),
});

export const updateModuloRolSchema = createModuloRolSchema.partial();

export type CreateModuloRolDto = z.infer<typeof createModuloRolSchema>;
export type UpdateModuloRolDto = z.infer<typeof updateModuloRolSchema>; 