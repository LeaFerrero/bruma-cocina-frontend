import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1, "El usuario es obligatorio"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});
