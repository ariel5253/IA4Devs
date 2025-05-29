import { z } from 'zod';

export const createPersonaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('El email debe ser válido'),
});

export const updatePersonaSchema = createPersonaSchema.partial();

export type CreatePersonaDto = z.infer<typeof createPersonaSchema>;
export type UpdatePersonaDto = z.infer<typeof updatePersonaSchema>; 