import { z } from 'zod';

export const createPermisoAccionSchema = z.object({
  rolId: z.number().int('El ID del rol debe ser un número entero'),
  accionVistaId: z.number().int('El ID de la acción de vista debe ser un número entero'),
  permitido: z.boolean(),
});

export const updatePermisoAccionSchema = createPermisoAccionSchema.partial();

export type CreatePermisoAccionDto = z.infer<typeof createPermisoAccionSchema>;
export type UpdatePermisoAccionDto = z.infer<typeof updatePermisoAccionSchema>; 