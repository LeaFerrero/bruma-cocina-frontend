import { z } from "zod";
import { parseDecimal } from "../../../utils/parsers";
import { ACCEPTED_IMAGE_TYPES } from "./imageTypes";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

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
    .array(z.string())
    .min(1, "Debe ingresar al menos una categoría válida"),

  description: z
    .string({ required_error: "La descripción es obligatoria." })
    .trim()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(250, "La descripción debe tener un máximo de 250 caracteres"),

  ingredients: z
    .array(
      z.object({
        _id: z.string({ required_error: "Falta la referencia al insumo" }),
        quantity: z
          .any()
          .transform((value) => parseDecimal(value, 3))
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
    .min(1, "Debe agregar al menos un ingrediente a la receta"),

  image: z
    .union([z.instanceof(File), z.string(), z.null(), z.undefined()])
    .optional()
    .superRefine((file, ctx) => {
      if (file instanceof File) {
        if (file.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "El archivo es demasiado pesado. El límite máximo es de 2MB.",
          });
        }
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Por favor, seleccioná un archivo de imagen válido (JPEG, PNG, WEBP).",
          });
        }
      }
    }),
});

export { mealSchema };
