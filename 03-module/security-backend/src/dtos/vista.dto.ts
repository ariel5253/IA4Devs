import { z } from 'zod';

export const createVistaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().optional(),
  ruta: z.string().min(1, 'La ruta es requerida'),
  icono: z.string().optional(),
  moduloId: z.number().int('El ID del módulo debe ser un número entero'),
});

export const updateVistaSchema = createVistaSchema.partial();

export type CreateVistaDto = z.infer<typeof createVistaSchema>;
export type UpdateVistaDto = z.infer<typeof updateVistaSchema>; 