-- =====================================================
--  LEGENDARY BURGER — orders table
--  Correr en: Supabase → SQL Editor → New query
-- =====================================================

-- ── 1. Tabla principal ────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Estado del pedido en cocina
  status           TEXT        NOT NULL DEFAULT 'nuevo'
    CHECK (status IN ('nuevo', 'preparando', 'listo', 'entregado')),

  -- Datos del cliente
  customer_name    TEXT        NOT NULL,
  customer_phone   TEXT        NOT NULL,
  customer_address TEXT,

  -- Modalidad y pago
  delivery_mode    TEXT        NOT NULL DEFAULT 'retiro'
    CHECK (delivery_mode IN ('retiro', 'envio')),
  payment_method   TEXT
    CHECK (payment_method IN ('efectivo', 'transferencia', 'mercadopago')),
  payment_change   TEXT,       -- vuelto si paga en efectivo

  -- Pedido
  notes            TEXT,
  items            JSONB       NOT NULL DEFAULT '[]'::jsonb,
                               -- [{id, name, qty, unit_price, line_total,
                               --   removed_ingredients: []}]
  subtotal         NUMERIC(10,2) NOT NULL DEFAULT 0,
  delivery_fee     NUMERIC(10,2) NOT NULL DEFAULT 0,
  total            NUMERIC(10,2) NOT NULL DEFAULT 0,
  comanda          TEXT        -- copia del texto formateado para WhatsApp
);

-- ── 2. Índices de rendimiento ─────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_status
  ON orders (status);

CREATE INDEX IF NOT EXISTS idx_orders_created_at
  ON orders (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_status_created
  ON orders (status, created_at DESC);

-- ── 3. Trigger: updated_at automático ────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS orders_set_updated_at ON orders;
CREATE TRIGGER orders_set_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 4. RLS (Row Level Security) ───────────────────────
--  Habilitamos RLS para tener control por política.
--  Usamos la clave anon para inserts (clientes web)
--  y reads/updates (panel de cocina).
--
--  En producción avanzada: reemplazar TO anon
--  por un rol autenticado con Supabase Auth.

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Clientes anónimos pueden CREAR pedidos
DROP POLICY IF EXISTS "orders_insert_anon" ON orders;
CREATE POLICY "orders_insert_anon" ON orders
  FOR INSERT TO anon
  WITH CHECK (true);

-- Clientes y panel pueden LEER pedidos
DROP POLICY IF EXISTS "orders_select_anon" ON orders;
CREATE POLICY "orders_select_anon" ON orders
  FOR SELECT TO anon
  USING (true);

-- Panel puede ACTUALIZAR el estado
DROP POLICY IF EXISTS "orders_update_anon" ON orders;
CREATE POLICY "orders_update_anon" ON orders
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- ── 5. Habilitar Realtime en esta tabla ───────────────
--  En Supabase Dashboard: Database → Replication → orders ✓
--  O ejecutar este bloque:

ALTER TABLE orders REPLICA IDENTITY FULL;

-- ── 6. Credenciales del panel (en site_config) ───────
--  Insertar las credenciales del panel de cocina.
--  Si ya existe la tabla site_config, agregar estas filas:

INSERT INTO site_config (key, value)
VALUES
  ('panel_user', 'admin'),
  ('panel_pass', 'legendary2024')
ON CONFLICT (key) DO NOTHING;

-- ── 7. Datos de prueba (opcional, borrar en producción) ─
/*
INSERT INTO orders
  (customer_name, customer_phone, delivery_mode, payment_method,
   items, subtotal, delivery_fee, total, status)
VALUES
  ('Juan Test', '099000001', 'retiro', 'efectivo',
   '[{"name":"Legendary Double","qty":2,"unit_price":450,"line_total":900}]'::jsonb,
   900, 0, 900, 'nuevo'),
  ('María Test', '099000002', 'envio', 'mercadopago',
   '[{"name":"Papas Cheddar Bacon","qty":1,"unit_price":250,"line_total":250}]'::jsonb,
   250, 150, 400, 'preparando');
*/
