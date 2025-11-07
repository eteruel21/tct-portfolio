-- ======================================================
--   TABLA DE RESERVAS — TCT SERVICES
-- ======================================================

DROP TABLE IF EXISTS reservas;

CREATE TABLE reservas (
  codigo      TEXT PRIMARY KEY,      -- Código único de cada cita (ABCDE1)
  nombre      TEXT NOT NULL,         -- Nombre del cliente
  email       TEXT NOT NULL,         -- Correo del cliente
  telefono    TEXT,                  -- Teléfono opcional
  fecha       TEXT NOT NULL,         -- Fecha YYYY-MM-DD
  hora        TEXT NOT NULL,         -- Hora HH:MM
  direccion   TEXT,                  -- Dirección donde se realizará el trabajo
  motivo      TEXT,                  -- Motivo del servicio
  creado_en   TEXT DEFAULT (datetime('now', 'localtime'))   -- Fecha y hora de creación
);

CREATE INDEX idx_reservas_fecha    ON reservas (fecha);
CREATE INDEX idx_reservas_codigo   ON reservas (codigo);
CREATE INDEX idx_reservas_email    ON reservas (email);

-- ======================================================
--   TABLAS DE COTIZACIONES — TCT SERVICES
-- ======================================================

DROP TABLE IF EXISTS cotizacion_items;
DROP TABLE IF EXISTS cotizaciones;

CREATE TABLE cotizaciones (
  id TEXT PRIMARY KEY,                   -- UUID
  codigo TEXT UNIQUE NOT NULL,           -- Código COT-XXXXXX
  created_at TEXT NOT NULL,              -- Fecha de creación
  cliente_nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  ubicacion TEXT,
  tipo TEXT,
  mensaje TEXT,
  subtotal REAL NOT NULL,
  itbms REAL NOT NULL,
  total REAL NOT NULL
);

CREATE TABLE cotizacion_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cotizacion_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  nombre TEXT NOT NULL,
  unidad TEXT NOT NULL,
  cantidad REAL NOT NULL,
  precio_unit REAL NOT NULL,
  subtotal REAL NOT NULL,
  categoria TEXT NOT NULL,
  FOREIGN KEY (cotizacion_id) REFERENCES cotizaciones(id)
);

CREATE INDEX idx_cotizaciones_codigo ON cotizaciones (codigo);
CREATE INDEX idx_cotizaciones_email  ON cotizaciones (email);

-- =======================================================
--   TABLA CATALOGO DE SERVICIOS — TCT SERVICES
-- =======================================================

DROP TABLE IF EXISTS catalogo_servicios;

CREATE TABLE catalogo_servicios (
  id TEXT PRIMARY KEY,
  categoria TEXT NOT NULL,
  nombre TEXT NOT NULL,
  unidad TEXT NOT NULL,
  precio_unit REAL NOT NULL
);
