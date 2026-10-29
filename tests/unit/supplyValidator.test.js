import { test } from "node:test";
import assert from "node:assert/strict";
import {
  supplySchema,
  stockEntryListSchema,
} from "../../src/features/supplies/utils/supplyValidator.js";

const validSupply = {
  name: "Harina",
  unit: "kg",
  price: "1500,50",
  currentStock: "10,5",
  minStock: "2",
};

const messagesOf = (result) => result.error.issues.map((issue) => issue.message);

test("acepta un insumo válido y convierte la coma decimal", () => {
  const result = supplySchema.safeParse(validSupply);

  assert.equal(result.success, true);
  assert.equal(result.data.price, 1500.5);
  assert.equal(result.data.currentStock, 10.5);
  assert.equal(result.data.minStock, 2);
});

test("rechaza un nombre vacío con el mensaje esperado", () => {
  const result = supplySchema.safeParse({ ...validSupply, name: "" });

  assert.equal(result.success, false);
  assert.ok(messagesOf(result).includes("El nombre es obligatorio."));
});

test("rechaza un precio igual a cero", () => {
  const result = supplySchema.safeParse({ ...validSupply, price: "0" });

  assert.equal(result.success, false);
  assert.ok(messagesOf(result).includes("El precio debe ser mayor a 0"));
});

test("rechaza un stock actual negativo", () => {
  const result = supplySchema.safeParse({ ...validSupply, currentStock: "-5" });

  assert.equal(result.success, false);
  assert.ok(messagesOf(result).includes("El stock no puede ser negativo"));
});

test("rechaza un insumo sin unidad de medida", () => {
  const result = supplySchema.safeParse({ ...validSupply, unit: "" });

  assert.equal(result.success, false);
  assert.ok(
    messagesOf(result).includes("Debes seleccionar una unidad de medida"),
  );
});

test("rechaza un ingreso de stock con la lista vacía", () => {
  const result = stockEntryListSchema.safeParse({ items: [] });

  assert.equal(result.success, false);
  assert.ok(
    messagesOf(result).includes("Debe agregar al menos un insumo a la lista"),
  );
});

test("rechaza un precio no numérico con el mensaje esperado", () => {
  const result = supplySchema.safeParse({ ...validSupply, price: "abc" });

  assert.equal(result.success, false);
  assert.ok(messagesOf(result).includes("El precio tiene que ser numérico"));
});
