import { z } from "zod";
import { parseDecimal } from "../../../utils/parseDecimal";
import { stockItemSchema } from "../../supplies";

const mealSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio." })
    .trim()
    .min(1, "El nombre es obligatorio.")
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre debe tener como máximo 50 caracteres."),

  price: z
    .any()
    .transform((value) => parseDecimal(value, 2))
    .refine((val) => !Number.isNaN(val), "El precio tiene que ser numérico")
    .pipe(
      z
        .number({ required_error: "El precio es obligatorio" })
        .positive("El precio debe ser mayor a 0"),
    ),

  category: z
    .string({ required_error: "La categoría es obligatoria." })
    .transform((val) =>
      val
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat !== ""),
    )
    .pipe(
      z.array(z.string()).min(1, "Debe ingresar al menos una categoría válida"),
    ),

  description: z
    .string({ required_error: "La descripción es obligatoria." })
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(250, "La descripción debe tener un máximo de 250 caracteres"),

  ingredients: z
    .array(stockItemSchema)
    .min(1, "Debe agregar al menos un ingrediente a la receta"),
});

export { mealSchema };
