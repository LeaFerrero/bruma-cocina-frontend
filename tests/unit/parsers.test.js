import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseDecimal,
  parseInteger,
  formatForDisplay,
} from "../../src/utils/parsers.js";

describe("Utilidades de parseo (Frontend)", () => {
  describe("parseDecimal", () => {
    it("convierte la coma decimal en punto", () => {
      assert.equal(parseDecimal("1,5", 2), 1.5);
    });

    it("redondea a la cantidad de decimales indicada", () => {
      assert.equal(parseDecimal(2.3456, 2), 2.35);
      assert.equal(parseDecimal("0,1234", 3), 0.123);
    });

    it("trata un campo vacío como 0", () => {
      assert.equal(parseDecimal("", 2), 0);
      assert.equal(parseDecimal(null, 2), 0);
      assert.equal(parseDecimal(undefined, 2), 0);
    });

    it("devuelve NaN con texto no numérico o con separador de miles", () => {
      assert.ok(Number.isNaN(parseDecimal("abc", 2)));
      assert.ok(Number.isNaN(parseDecimal("1.500,50", 2)));
    });
  });

  describe("parseInteger", () => {
    it("convierte texto a entero y descarta los decimales", () => {
      assert.equal(parseInteger("12"), 12);
      assert.equal(parseInteger("2,5"), 2);
    });

    it("devuelve NaN con texto no numérico", () => {
      assert.ok(Number.isNaN(parseInteger("abc")));
    });
  });

  describe("formatForDisplay", () => {
    it("fuerza la cantidad de decimales para mostrar", () => {
      assert.equal(formatForDisplay(150, 2), "150.00");
      assert.equal(formatForDisplay("1,5", 3), "1.500");
    });

    it("muestra un guion cuando el valor no es numérico", () => {
      assert.equal(formatForDisplay("abc", 2), "-");
    });
  });
});
