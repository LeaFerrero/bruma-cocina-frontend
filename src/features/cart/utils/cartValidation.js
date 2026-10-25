import { z } from "zod";
import { parseInteger } from "../../../utils/parsers";

const orderSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio." })
    .trim()
    .min(1, "El nombre es obligatorio.")
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre debe tener como máximo 50 caracteres."),

  lastName: z
    .string({ required_error: "El apellido es obligatorio." })
    .trim()
    .min(1, "El apellido es obligatorio.")
    .min(2, "El apellido debe tener al menos 2 caracteres.")
    .max(50, "El apellido debe tener como máximo 50 caracteres."),

  address: z
    .string({ required_error: "La dirección es obligatoria." })
    .trim()
    .min(1, "La dirección es obligatoria.")
    .min(2, "La dirección debe tener al menos 2 caracteres.")
    .max(100, "La dirección debe tener como máximo 100 caracteres."),

  phone: z
    .string({ required_error: "El teléfono es obligatorio." })
    .min(10, "El teléfono debe tener al menos 10 caracteres.")
    .max(15, "El teléfono debe tener como máximo 15 caracteres.")
    .regex(
      /^\+?[0-9\s\-]+$/,
      "Solo se permiten números, espacios, guiones y el símbolo +.",
    ),

  notes: z
    .string()
    .max(250, "Las notas deben tener como máximo 250 caracteres.")
    .optional(),

  meals: z
    .array(
      z.object({
        _id: z.string({ required_error: "Falta la referencia a la vianda" }),
        quantity: z
          .any()
          .transform((value) => parseInteger(value))
          .refine(
            (val) => !Number.isNaN(val),
            "La cantidad debe ser un número válido",
          )
          .pipe(
            z
              .number({ required_error: "La cantidad es obligatoria" })
              .positive("La cantidad debe ser mayor a 0"),
          ),
      }),
    )
    .min(1, "Debe agregar una vianda al carrito"),
});

export { orderSchema };
