import { z } from "zod";

const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre debe tener como máximo 50 caracteres."),

  lastName: z
    .string()
    .trim()
    .min(1, "El apellido es obligatorio.")
    .min(2, "El apellido debe tener al menos 2 caracteres.")
    .max(50, "El apellido debe tener como máximo 50 caracteres."),

  role: z.string().min(1, "Debes seleccionar un rol."),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria.")
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(16, "La contraseña debe tener como máximo 16 caracteres."),
});

const updateUserSchema = createUserSchema.extend({
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(16, "La contraseña debe tener como máximo 16 caracteres.")
    .optional()
    .or(z.literal("")),
});

export { createUserSchema, updateUserSchema };
