import { z } from "zod";
import { parseInteger } from "../../../utils/parsers";

const mealStockItemSchema = z.object({
  _id: z.string().min(1, "El ID de la vianda es obligatorio"),
  name: z.string().optional(),
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
});

const mealStockListSchema = z.object({
  items: z
    .array(mealStockItemSchema)
    .min(1, "Debe agregar al menos una vianda a la lista"),
});

export { mealStockItemSchema, mealStockListSchema };
