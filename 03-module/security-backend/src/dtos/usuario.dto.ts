import { z } from 'zod';

export const createUsuarioSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  personaId: z.number().int('El ID de persona debe ser un número entero'),
  rolId: z.number().int('El ID de rol debe ser un número entero'),
});

export const updateUsuarioSchema = createUsuarioSchema.partial();

export type CreateUsuarioDto = z.infer<typeof createUsuarioSchema>;
export type UpdateUsuarioDto = z.infer<typeof updateUsuarioSchema>; 