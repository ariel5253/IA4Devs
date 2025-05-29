import { z } from 'zod';

export const createAccionVistaSchema = z.object({
  vistaId: z.number().int('El ID de vista debe ser un número entero'),
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().optional(),
  codigo: z.string().min(1, 'El código es requerido'),
});

export const updateAccionVistaSchema = createAccionVistaSchema.partial();

export type CreateAccionVistaDto = z.infer<typeof createAccionVistaSchema>;
export type UpdateAccionVistaDto = z.infer<typeof updateAccionVistaSchema>; 