const UNITS = Object.freeze({
  KG: "kg",
  L: "L",
  U: "u",
});

const UNIT_NAMES = Object.freeze({
  [UNITS.KG]: "Kilogramos (kg)",
  [UNITS.L]: "Litros (L)",
  [UNITS.U]: "Unidades (u)",
});

const UNIT_OPTIONS = Object.values(UNITS).map((unit) => ({
  value: unit,
  label: UNIT_NAMES[unit],
}));

export { UNITS, UNIT_NAMES, UNIT_OPTIONS };
