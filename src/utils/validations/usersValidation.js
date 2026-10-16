import { z } from "zod";

const createUserSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio." })
    .trim()
    .min(1, "El nombre es obligatorio.")
    .min(2, "El nombre debe tener al menos 2 caracteres."),

  lastName: z
    .string({ required_error: "El apellido es obligatorio." })
    .trim()
    .min(1, "El apellido es obligatorio.")
    .min(2, "El apellido debe tener al menos 2 caracteres."),

  role: z
    .string({ required_error: "Debes seleccionar un rol." })
    .min(1, "Debes seleccionar un rol."),

  password: z
    .string({ required_error: "La contraseña es obligatoria." })
    .min(8, "La contraseña debe tener al menos 8 caracteres."),
});

const updateUserSchema = createUserSchema.extend({
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .optional()
    .or(z.literal("")),
});

export { createUserSchema, updateUserSchema };
