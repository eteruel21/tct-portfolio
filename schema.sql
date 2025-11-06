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

-- Índices para acelerar consultas
CREATE INDEX idx_reservas_fecha    ON reservas (fecha);
CREATE INDEX idx_reservas_codigo   ON reservas (codigo);
CREATE INDEX idx_reservas_email    ON reservas (email);

-- ======================================================
--   FIN DEL SCHEMA
-- ======================================================
