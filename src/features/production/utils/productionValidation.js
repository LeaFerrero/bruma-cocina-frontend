import { z } from "zod";
import { parseInteger } from "../../../utils/parsers";

const notEmpty = (value) => String(value ?? "").trim() !== "";

const mealStockListSchema = z.object({
  meals: z
    .array(
      z.object({
        _id: z.string().min(1, "El ID de la vianda es obligatorio"),
        name: z.string().optional(),
        quantity: z
          .any()
          .refine(notEmpty, "La cantidad es obligatoria")
          .transform((value) => parseInteger(value))
          .refine(
            (val) => !Number.isNaN(val),
            "La cantidad debe ser un número válido",
          )
          .pipe(z.number().positive("La cantidad debe ser mayor a 0")),
      }),
    )
    .min(1, "Debe agregar al menos una vianda a la lista"),
});

export { mealStockListSchema };
