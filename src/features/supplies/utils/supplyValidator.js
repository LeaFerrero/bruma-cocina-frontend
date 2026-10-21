import { z } from "zod";
import { parseDecimal } from "../../../utils/parseDecimal";

// 1. Validador para crear o editar un insumo
const supplySchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio." })
    .trim()
    .min(1, "El nombre es obligatorio.")
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(50, "El nombre debe tener como máximo 50 caracteres."),

  unit: z.string().min(1, "Debes seleccionar una unidad de medida"),

  price: z
    .any()
    .transform((value) => parseDecimal(value, 2))
    .refine((val) => !Number.isNaN(val), "El precio tiene que ser numérico")
    .pipe(
      z
        .number({ required_error: "El precio es obligatorio" })
        .positive("El precio debe ser mayor a 0"),
    ),

  currentStock: z
    .any()
    .transform((value) => parseDecimal(value, 3))
    .refine((val) => !Number.isNaN(val), "El stock tiene que ser numérico")
    .pipe(
      z
        .number({ required_error: "El stock es obligatorio" })
        .min(0, "El stock no puede ser negativo"),
    ),

  minStock: z
    .any()
    .transform((value) => parseDecimal(value, 3))
    .refine(
      (val) => !Number.isNaN(val),
      "El stock mínimo tiene que ser numérico",
    )
    .pipe(
      z
        .number({ required_error: "El stock mínimo es obligatorio" })
        .min(0, "El stock mínimo no puede ser negativo"),
    ),
});

// 2. Validador individual para los ítems del ingreso de stock
const stockItemSchema = z.object({
  _id: z.string().min(1, "El ID del insumo es obligatorio"),
  name: z.string().optional(),
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
});

// 3. Validador para la lista completa
const stockEntryListSchema = z.object({
  items: z
    .array(stockItemSchema)
    .min(1, "Debe agregar al menos un insumo a la lista"),
});

export { supplySchema, stockItemSchema, stockEntryListSchema };
