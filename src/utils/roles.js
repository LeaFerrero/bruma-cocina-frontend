const ROLES = Object.freeze({
  ADMIN: "admin",
  COCINA: "cocina",
  CAJA: "caja",
  STOCK: "stock",
});

const ROLE_NAMES = Object.freeze({
  [ROLES.ADMIN]: "Administrador",
  [ROLES.COCINA]: "Cocina",
  [ROLES.CAJA]: "Caja",
  [ROLES.STOCK]: "Stock",
});

const ROLE_OPTIONS = Object.values(ROLES).map((role) => ({
  value: role,
  label: ROLE_NAMES[role],
}));

export { ROLES, ROLE_NAMES, ROLE_OPTIONS };
