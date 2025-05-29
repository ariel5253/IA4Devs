import { z } from 'zod';

export const createVistaModuloSchema = z.object({
  vistaId: z.number().int('El ID de vista debe ser un número entero'),
  moduloId: z.number().int('El ID de módulo debe ser un número entero'),
  orden: z.number().int('El orden debe ser un número entero').min(1, 'El orden debe ser mayor a 0'),
});

export const updateVistaModuloSchema = createVistaModuloSchema.partial();

export type CreateVistaModuloDto = z.infer<typeof createVistaModuloSchema>;
export type UpdateVistaModuloDto = z.infer<typeof updateVistaModuloSchema>; 