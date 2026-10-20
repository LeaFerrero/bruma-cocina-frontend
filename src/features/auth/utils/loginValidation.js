import { z } from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(1, "El usuario es obligatorio")
    .min(5, "El usuario debe tener como mínimo 5 caracteres")
    .max(50, "El nombre de usuario debe tener como máximo 50 caracteres"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(16, "La contraseña debe tener como máximo 16 caracteres"),
});
