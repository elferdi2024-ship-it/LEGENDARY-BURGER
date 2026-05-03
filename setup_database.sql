-- =====================================================
--  LEGENDARY BURGER — FULL DATABASE SETUP & SEED
--  Correr en: Supabase → SQL Editor → New query
-- =====================================================

-- ── 1. LIMPIEZA (OPCIONAL) ───────────────────────────
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS products;
-- DROP TABLE IF EXISTS categories;
-- DROP TABLE IF EXISTS site_config;
-- DROP TABLE IF EXISTS builder_options;

-- ── 2. TABLAS BASE ───────────────────────────────────

-- Categorías
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- Productos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) DEFAULT 0,
  img TEXT,
  imgs JSONB DEFAULT '[]'::jsonb,
  badge TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Configuración del sitio
CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Opciones del Armador (Builder)
CREATE TABLE IF NOT EXISTS builder_options (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  is_multi BOOLEAN DEFAULT false,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INT DEFAULT 0,
  cols3 BOOLEAN DEFAULT false
);

-- Pedidos (Orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'nuevo',
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  delivery_mode TEXT DEFAULT 'retiro',
  payment_method TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  subtotal NUMERIC(10,2) DEFAULT 0,
  delivery_fee NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) DEFAULT 0,
  comanda TEXT
);

-- ── 3. POLÍTICAS RLS (ACCESO PÚBLICO PARA EL MVP) ─────
-- Nota: En producción real, se debería usar Supabase Auth para el Admin.

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE builder_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Políticas para Categorías
DROP POLICY IF EXISTS "Public Select" ON categories;
CREATE POLICY "Public Select" ON categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert" ON categories;
CREATE POLICY "Public Insert" ON categories FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Update" ON categories;
CREATE POLICY "Public Update" ON categories FOR UPDATE USING (true);

-- Políticas para Productos
DROP POLICY IF EXISTS "Public Select" ON products;
CREATE POLICY "Public Select" ON products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert" ON products;
CREATE POLICY "Public Insert" ON products FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Update" ON products;
CREATE POLICY "Public Update" ON products FOR UPDATE USING (true);

-- Políticas para Config
DROP POLICY IF EXISTS "Public Select" ON site_config;
CREATE POLICY "Public Select" ON site_config FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Upsert" ON site_config;
CREATE POLICY "Public Upsert" ON site_config FOR ALL USING (true);

-- Políticas para Builder Options
DROP POLICY IF EXISTS "Public Select" ON builder_options;
CREATE POLICY "Public Select" ON builder_options FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Upsert" ON builder_options;
CREATE POLICY "Public Upsert" ON builder_options FOR ALL USING (true);

-- Políticas para Orders
DROP POLICY IF EXISTS "Public Insert" ON orders;
CREATE POLICY "Public Insert" ON orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Select" ON orders;
CREATE POLICY "Public Select" ON orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Update" ON orders;
CREATE POLICY "Public Update" ON orders FOR UPDATE USING (true);

-- ── 4. SEED DATA: CATEGORÍAS ─────────────────────────

INSERT INTO categories (id, label, display_order) VALUES
('carne', 'Burger de Carne', 1),
('pollo', 'Otras Burgers', 2),
('veggie', 'Veggie', 3),
('milas', 'Milanesas y Chivitos', 4),
('papas', 'Papas', 5),
('extras', 'Extras en Burger', 6),
('bebidas', 'Bebidas', 7)
ON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, display_order = EXCLUDED.display_order;

-- ── 5. SEED DATA: PRODUCTOS ──────────────────────────

INSERT INTO products (id, category_id, name, description, price, img, imgs, badge) VALUES
('texas', 'carne', 'Texas Crispy', 'Smash de carne, bacon, salsa BBQ, cheddar, emmental x2, cebolla crispy y huevo frito.', 390, 'IMAGENES/Texas Crispy/Texas Crispy.jpg', '["IMAGENES/Texas Crispy/Texas Crispy.jpg", "IMAGENES/Texas Crispy/Texas Crispy 2.jpg"]', 'ESTRELLA'),
('only', 'carne', 'Only Cheese', 'Smash de carne, bacon, medallon de provolone, salsa BBQ y cheddar x2.', 390, 'IMAGENES/Only Chesse.jpg', '["IMAGENES/Only Chesse.jpg"]', NULL),
('triple', 'carne', 'Triple Cheese', 'Doble smash de carne, cheddar x4, salsa Legendary y cebolla.', 480, 'IMAGENES/Triple Chesse/triple chesse 1.jpg', '["IMAGENES/Triple Chesse/triple chesse 1.jpg", "IMAGENES/Triple Chesse/triple chesse 2.jpg", "IMAGENES/Triple Chesse/triple chesse 3.jpg"]', NULL),
('onion-rings', 'carne', 'Onion Rings', 'Smash de carne, aros de cebolla x3, muzza x3, mayonesa burger house y bacon.', 390, 'IMAGENES/Oniong Rings/Oniong Rings.jpg', '["IMAGENES/Oniong Rings/Oniong Rings.jpg", "IMAGENES/Oniong Rings/Oniong Rings 2.jpg", "IMAGENES/Oniong Rings/Oniong Rings 3.jpg"]', NULL),
('moon', 'carne', 'Moon Burger', 'Smash de carne, cheddar x2, salsa barbacoa y cebolla caramelizada.', 390, NULL, '[]', NULL),
('big-legend', 'carne', 'Big Legend', 'Doble smash de carne, bacon, salsa Legendary, cheddar x4 y pepinillos.', 480, 'IMAGENES/Big Legend/Big Legend.jpg', '["IMAGENES/Big Legend/Big Legend.jpg", "IMAGENES/Big Legend/Big Legend 2.jpg"]', 'TOP'),
('kids', 'carne', 'Kids Burger', 'Smash de carne, cheddar x3 y salsa a eleccion.', 350, 'IMAGENES/kid.jpg', '["IMAGENES/kid.jpg"]', NULL),
('crispy-bacon', 'pollo', 'Crispy Bacon', 'Pollo crispy, bacon, tomate, cheddar x2 y alioli.', 380, 'IMAGENES/Crispy Bacon.jpg', '["IMAGENES/Crispy Bacon.jpg"]', NULL),
('crispy-mix', 'pollo', 'Crispy Mix', 'Pollo crispy, cheddar y ensalada coleslaw.', 380, 'IMAGENES/Crispy MIX.jpg', '["IMAGENES/Crispy MIX.jpg"]', NULL),
('veggie', 'veggie', 'Veggie LGY', 'Medallon vegetal, huevo frito, emmental, lechuga, tomate y alioli.', 370, 'IMAGENES/Vegetariana LGY.jpg', '["IMAGENES/Vegetariana LGY.jpg"]', NULL),
('mila-americana', 'milas', 'Milanesa Americana', 'Milanesa de carne, panceta, huevo y salsa BBQ.', 420, 'IMAGENES/Mila Americana.jpg', '["IMAGENES/Mila Americana.jpg"]', NULL),
('mila-napo', 'milas', 'Milanesa Napolitana', 'Milanesa de carne, jamon, mozzarella y salsa de tomate.', 420, 'IMAGENES/napo.jpg', '["IMAGENES/napo.jpg"]', NULL),
('chivito', 'milas', 'Chivito Legendario', 'Lomo tiernizado, jamon, mozzarella, bacon, huevo frito, aceituna, lechuga, tomate y mayonesa.', 435, 'IMAGENES/Chivito Legendario/chivito legendario.jpg', '["IMAGENES/Chivito Legendario/chivito legendario.jpg"]', 'TOP'),
('papas', 'papas', 'Papas', 'Porcion de papas fritas.', 200, 'IMAGENES/fritas.jpg', '["IMAGENES/fritas.jpg"]', NULL),
('papas-cheddar', 'papas', 'Papas Cheddar', 'Papas con salsa cheddar caliente.', 240, 'IMAGENES/fritas cheddar.jpg', '["IMAGENES/fritas cheddar.jpg"]', NULL),
('papas-bacon', 'papas', 'Papas Cheddar y Bacon', 'Papas con cheddar y bacon crujiente.', 280, 'IMAGENES/papas  cheddar bacon.jpg', '["IMAGENES/papas  cheddar bacon.jpg"]', NULL),
('coca', 'bebidas', 'Linea Coca Cola 600ml', 'Refresco linea Coca Cola.', 130, NULL, '[]', NULL),
('agua', 'bebidas', 'Aguas', 'Agua con gas o sin gas.', 100, NULL, '[]', NULL)
ON CONFLICT (id) DO UPDATE SET 
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  img = EXCLUDED.img,
  imgs = EXCLUDED.imgs,
  badge = EXCLUDED.badge;

-- ── 6. SEED DATA: BUILDER OPTIONS ────────────────────

INSERT INTO builder_options (id, label, is_multi, display_order, cols3, options) VALUES
('base', 'Tipo de proteina', false, 1, false, '[
  {"id":"smash", "name":"Smash de carne", "code":"SM", "price":300},
  {"id":"pollo", "name":"Pollo crispy", "code":"CR", "price":300},
  {"id":"veggie", "name":"Patty vegetal", "code":"VG", "price":280}
]'),
('qty', 'Cantidad', false, 2, false, '[
  {"id":"single", "name":"Simple", "code":"S1", "price":0, "label":"incluido"},
  {"id":"double", "name":"Doble", "code":"D2", "price":120},
  {"id":"triple", "name":"Triple", "code":"T3", "price":240}
]'),
('bun', 'Pan', false, 3, false, '[
  {"id":"brioche", "name":"Brioche", "code":"BR", "price":0, "label":"incluido"},
  {"id":"clasico", "name":"Clasico", "code":"CL", "price":0, "label":"incluido"},
  {"id":"integral", "name":"Integral", "code":"IN", "price":0, "label":"incluido"}
]'),
('cheese', 'Queso', true, 4, false, '[
  {"id":"cheddar", "name":"Cheddar", "code":"CH", "price":35},
  {"id":"muzza", "name":"Mozzarella", "code":"MZ", "price":35},
  {"id":"provolone", "name":"Provolone", "code":"PV", "price":35},
  {"id":"emmental", "name":"Emmental", "code":"EM", "price":35}
]'),
('sauces', 'Salsas', true, 5, false, '[
  {"id":"mayo", "name":"Mayonesa", "code":"MY", "price":0, "label":"gratis"},
  {"id":"bbq", "name":"BBQ", "code":"BQ", "price":0, "label":"gratis"},
  {"id":"ketchup", "name":"Ketchup", "code":"KT", "price":0, "label":"gratis"},
  {"id":"mostaza", "name":"Mostaza", "code":"MS", "price":0, "label":"gratis"},
  {"id":"alioli", "name":"Alioli", "code":"AL", "price":0, "label":"gratis"},
  {"id":"legendary", "name":"Legendary", "code":"LG", "price":0, "label":"gratis"}
]'),
('toppings', 'Toppings extra', true, 6, true, '[
  {"id":"bacon", "name":"Bacon", "code":"BC", "price":35},
  {"id":"cebolla", "name":"Cebolla caramelizada", "code":"CB", "price":35},
  {"id":"lechuga", "name":"Lechuga", "code":"LE", "price":35},
  {"id":"tomate", "name":"Tomate", "code":"TM", "price":35},
  {"id":"pepinillos", "name":"Pepinillos", "code":"PK", "price":35},
  {"id":"huevo", "name":"Huevo frito", "code":"HF", "price":35},
  {"id":"jalapeno", "name":"Jalapeno", "code":"JP", "price":35},
  {"id":"aros", "name":"Aros de cebolla", "code":"AR", "price":35},
  {"id":"hongos", "name":"Hongos", "code":"HG", "price":35}
]')
ON CONFLICT (id) DO UPDATE SET 
  label = EXCLUDED.label,
  is_multi = EXCLUDED.is_multi,
  display_order = EXCLUDED.display_order,
  cols3 = EXCLUDED.cols3,
  options = EXCLUDED.options;

-- ── 7. SEED DATA: CONFIG ─────────────────────────────

INSERT INTO site_config (key, value) VALUES
('wa_number', '59892265952'),
('delivery_price', '100'),
('panel_user', 'admin'),
('panel_pass', 'legendary2024')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
