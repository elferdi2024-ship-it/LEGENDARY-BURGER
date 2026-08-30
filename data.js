// filepath: d:/PROYECTOS/burgaa/data.js
/* =====================================================
   LEGENDARY BURGER — data.js v2.0
   Shared Catalog, Offline Fallback & Synchronous Data Layer
   ===================================================== */

const DEFAULT_CATEGORIES = [
  { id: 'carne', label: 'Burger de Carne', display_order: 1 },
  { id: 'pollo', label: 'Otras Burgers', display_order: 2 },
  { id: 'veggie', label: 'Veggie', display_order: 3 },
  { id: 'milas', label: 'Milanesas y Chivitos', display_order: 4 },
  { id: 'papas', label: 'Papas y Acompañamientos', display_order: 5 },
  { id: 'bebidas', label: 'Bebidas y Birras', display_order: 6 },
  { id: 'extras', label: 'Extras en Burger', display_order: 7 }
];

const DEFAULT_PRODUCTS = [
  {
    id: 'texas',
    category_id: 'carne',
    name: 'Texas Crispy',
    description: 'Smash de carne, bacon, salsa BBQ, cheddar, emmental x2, cebolla crispy y huevo frito.',
    price: 390,
    img: 'IMAGENES/Texas Crispy/Texas Crispy.jpg',
    imgs: ['IMAGENES/Texas Crispy/Texas Crispy.jpg', 'IMAGENES/Texas Crispy/Texas Crispy 2.jpg'],
    badge: 'ESTRELLA'
  },
  {
    id: 'triple',
    category_id: 'carne',
    name: 'Triple Cheese',
    description: 'Doble smash de carne, cheddar x4, salsa Legendary y cebolla.',
    price: 480,
    img: 'IMAGENES/Triple Chesse/triple chesse 1.jpg',
    imgs: ['IMAGENES/Triple Chesse/triple chesse 1.jpg', 'IMAGENES/Triple Chesse/triple chesse 2.jpg', 'IMAGENES/Triple Chesse/triple chesse 3.jpg'],
    badge: 'POPULAR'
  },
  {
    id: 'big-legend',
    category_id: 'carne',
    name: 'Big Legend',
    description: 'Doble smash de carne, bacon, salsa Legendary, cheddar x4 y pepinillos.',
    price: 480,
    img: 'IMAGENES/Big Legend/Big Legend.jpg',
    imgs: ['IMAGENES/Big Legend/Big Legend.jpg', 'IMAGENES/Big Legend/Big Legend 2.jpg'],
    badge: 'TOP'
  },
  {
    id: 'only',
    category_id: 'carne',
    name: 'Only Cheese',
    description: 'Smash de carne, bacon, medallon de provolone, salsa BBQ y cheddar x2.',
    price: 390,
    img: 'IMAGENES/Only Chesse.jpg',
    imgs: ['IMAGENES/Only Chesse.jpg']
  },
  {
    id: 'onion-rings',
    category_id: 'carne',
    name: 'Onion Rings Burger',
    description: 'Smash de carne, aros de cebolla x3, muzza x3, mayonesa burger house y bacon.',
    price: 390,
    img: 'IMAGENES/Oniong Rings/Oniong Rings.jpg',
    imgs: ['IMAGENES/Oniong Rings/Oniong Rings.jpg', 'IMAGENES/Oniong Rings/Oniong Rings 2.jpg', 'IMAGENES/Oniong Rings/Oniong Rings 3.jpg']
  },
  {
    id: 'moon',
    category_id: 'carne',
    name: 'Moon Burger',
    description: 'Smash de carne, cheddar x2, salsa barbacoa y cebolla caramelizada.',
    price: 390,
    img: 'IMAGENES/Moon.jpeg',
    imgs: ['IMAGENES/Moon.jpeg']
  },
  {
    id: 'kids',
    category_id: 'carne',
    name: 'Kids Burger',
    description: 'Smash de carne, cheddar x3 y salsa suave a elección.',
    price: 350,
    img: 'IMAGENES/kid.jpg',
    imgs: ['IMAGENES/kid.jpg']
  },
  {
    id: 'crispy-bacon',
    category_id: 'pollo',
    name: 'Crispy Bacon',
    description: 'Pollo crispy extra crujiente, bacon, tomate fresco, cheddar x2 y alioli.',
    price: 380,
    img: 'IMAGENES/Crispy Bacon.jpg',
    imgs: ['IMAGENES/Crispy Bacon.jpg']
  },
  {
    id: 'crispy-mix',
    category_id: 'pollo',
    name: 'Crispy Mix',
    description: 'Pollo crispy, cheddar fundido y ensalada coleslaw fresca.',
    price: 380,
    img: 'IMAGENES/Crispy MIX.jpg',
    imgs: ['IMAGENES/Crispy MIX.jpg']
  },
  {
    id: 'veggie',
    category_id: 'veggie',
    name: 'Veggie LGY',
    description: 'Medallon vegetal artesanal, huevo frito, emmental, lechuga, tomate y alioli.',
    price: 370,
    img: 'IMAGENES/Vegetariana LGY.jpg',
    imgs: ['IMAGENES/Vegetariana LGY.jpg']
  },
  {
    id: 'chivito',
    category_id: 'milas',
    name: 'Chivito Legendario',
    description: 'Lomo tiernizado, jamon, mozzarella, bacon, huevo frito, aceituna, lechuga, tomate y mayonesa.',
    price: 435,
    img: 'IMAGENES/Chivito Legendario/chivito legendario.jpg',
    imgs: ['IMAGENES/Chivito Legendario/chivito legendario.jpg'],
    badge: 'TOP'
  },
  {
    id: 'mila-americana',
    category_id: 'milas',
    name: 'Milanesa Americana',
    description: 'Milanesa de carne vacuna, panceta crujiente, huevo frito y salsa BBQ.',
    price: 420,
    img: 'IMAGENES/Mila Americana.jpg',
    imgs: ['IMAGENES/Mila Americana.jpg']
  },
  {
    id: 'mila-napo',
    category_id: 'milas',
    name: 'Milanesa Napolitana',
    description: 'Milanesa de carne vacuna, jamon cocido, mozzarella fundida y salsa de tomate casera.',
    price: 420,
    img: 'IMAGENES/napo.jpg',
    imgs: ['IMAGENES/napo.jpg']
  },
  {
    id: 'papas',
    category_id: 'papas',
    name: 'Papas Fritas Clásicas',
    description: 'Porcion de papas fritas baston bien doradas y crujientes.',
    price: 200,
    img: 'IMAGENES/fritas.jpg',
    imgs: ['IMAGENES/fritas.jpg']
  },
  {
    id: 'papas-cheddar',
    category_id: 'papas',
    name: 'Papas con Cheddar',
    description: 'Papas fritas con abundante salsa de queso cheddar fundido.',
    price: 240,
    img: 'IMAGENES/fritas cheddar.jpg',
    imgs: ['IMAGENES/fritas cheddar.jpg']
  },
  {
    id: 'papas-bacon',
    category_id: 'papas',
    name: 'Papas Cheddar & Bacon',
    description: 'Papas fritas cubiertas de salsa cheddar caliente y lluvia de bacon crujiente.',
    price: 280,
    img: 'IMAGENES/papas  cheddar bacon.jpg',
    imgs: ['IMAGENES/papas  cheddar bacon.jpg'],
    badge: 'POPULAR'
  },
  {
    id: 'aros-cebolla',
    category_id: 'papas',
    name: 'Aros de Cebolla',
    description: 'Aros de cebolla rebozados dorados y crocantes.',
    price: 220,
    img: 'IMAGENES/Oniong Rings/Oniong Rings.jpg',
    imgs: ['IMAGENES/Oniong Rings/Oniong Rings.jpg']
  },
  {
    id: 'pepsi-500',
    category_id: 'bebidas',
    name: 'Pepsi 500ml',
    description: 'Refresco Pepsi frío 500ml botella.',
    price: 130,
    img: 'IMAGENES/PEPSI/PEPSI.jpg',
    imgs: ['IMAGENES/PEPSI/PEPSI.jpg'],
    sponsor_name: 'Pepsi',
    sponsor_logo: 'SPONSORS/pepsi-logo.png',
    sponsor_color: '#005CB4',
    sponsor_badge: 'OFICIAL'
  },
  {
    id: 'cabezas-tirada',
    category_id: 'bebidas',
    name: 'Cabesas Bier Tirada 500ml',
    description: 'Cerveza artesanal tirada bien fría en vaso.',
    price: 250,
    img: 'IMAGENES/Cabezas bier tirada/tirada.png',
    imgs: ['IMAGENES/Cabezas bier tirada/tirada.png'],
    sponsor_name: 'Cabesas Bier',
    sponsor_logo: 'SPONSORS/cabezas-bier-logo.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'ARTESANAL'
  },
  {
    id: 'blonde-ale',
    category_id: 'bebidas',
    name: 'Cabesas Blonde Ale',
    description: 'Cerveza artesanal rubia balanceada en botella de vidrio.',
    price: 270,
    img: 'IMAGENES/CABEZAS BIER BOTELLA/imgi_115_BlondeAle_3-compressor.jpg',
    imgs: ['IMAGENES/CABEZAS BIER BOTELLA/imgi_115_BlondeAle_3-compressor.jpg'],
    sponsor_name: 'Cabesas Bier',
    sponsor_logo: 'SPONSORS/cabezas-bier-logo.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'ARTESANAL'
  },
  {
    id: 'ipa',
    category_id: 'bebidas',
    name: 'Cabesas Doble IPA',
    description: 'Cerveza artesanal Doble IPA intensa con amargor lupulado.',
    price: 270,
    img: 'IMAGENES/CABEZAS BIER BOTELLA/imgi_100_DobleIpa_1-compressor.jpg',
    imgs: ['IMAGENES/CABEZAS BIER BOTELLA/imgi_100_DobleIpa_1-compressor.jpg'],
    sponsor_name: 'Cabesas Bier',
    sponsor_logo: 'SPONSORS/cabezas-bier-logo.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'ARTESANAL'
  },
  {
    id: 'stout',
    category_id: 'bebidas',
    name: 'Cabesas Cerveza Especial',
    description: 'Cerveza artesanal especial de autor con cuerpo y aroma.',
    price: 270,
    img: 'IMAGENES/CABEZAS BIER BOTELLA/imgi_127_CervezaEspecial_PUERCA-compressor.jpg',
    imgs: ['IMAGENES/CABEZAS BIER BOTELLA/imgi_127_CervezaEspecial_PUERCA-compressor.jpg'],
    sponsor_name: 'Cabesas Bier',
    sponsor_logo: 'SPONSORS/cabezas-bier-logo.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'ARTESANAL'
  },
  {
    id: 'cabezas-lata',
    category_id: 'bebidas',
    name: 'Cabesas Bier Lata',
    description: 'Cerveza artesanal en lata 473ml fresca.',
    price: 170,
    img: 'IMAGENES/CABEZAS BIER LATA/imgi_82_LatasPATRIA_00.jpg',
    imgs: ['IMAGENES/CABEZAS BIER LATA/imgi_82_LatasPATRIA_00.jpg'],
    sponsor_name: 'Cabesas Bier',
    sponsor_logo: 'SPONSORS/cabezas-bier-logo.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'ARTESANAL'
  },
  {
    id: 'cabezas-gin',
    category_id: 'bebidas',
    name: 'Cabesas Gintonic',
    description: 'Gintonic artesanal listo para tomar.',
    price: 250,
    img: 'IMAGENES/Cabezas bier gin/imgi_24_ch_gintonic-980x980.png',
    imgs: ['IMAGENES/Cabezas bier gin/imgi_24_ch_gintonic-980x980.png'],
    sponsor_name: 'Cabesas Bier',
    sponsor_logo: 'SPONSORS/cabezas-bier-logo.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'GIN'
  },
  {
    id: 'agua',
    category_id: 'bebidas',
    name: 'Agua Mineral 500ml',
    description: 'Agua mineral con gas o sin gas.',
    price: 100,
    img: null,
    imgs: []
  },
  {
    id: 'extra-bacon',
    category_id: 'extras',
    name: 'Extra Bacon',
    description: 'Panceta ahumada crujiente para tu burger.',
    price: 35,
    img: 'IMAGENES/BACON.jpg',
    imgs: ['IMAGENES/BACON.jpg']
  },
  {
    id: 'extra-huevo',
    category_id: 'extras',
    name: 'Extra Huevo Frito',
    description: 'Huevo frito con yema tierna.',
    price: 35,
    img: 'IMAGENES/HUEVO.jpg',
    imgs: ['IMAGENES/HUEVO.jpg']
  },
  {
    id: 'extra-aros',
    category_id: 'extras',
    name: 'Extra Aros de Cebolla',
    description: 'Aros de cebolla crocantes dentro de tu burger.',
    price: 35,
    img: 'IMAGENES/Oniong Rings/Oniong Rings.jpg',
    imgs: ['IMAGENES/Oniong Rings/Oniong Rings.jpg']
  },
  {
    id: 'extra-carne-cheddar',
    category_id: 'extras',
    name: 'Extra Medallón + Cheddar',
    description: 'Medallón smash adicional con cheddar fundido.',
    price: 90,
    img: 'IMAGENES/QUESSMASH.jpg',
    imgs: ['IMAGENES/QUESSMASH.jpg']
  },
  {
    id: 'extra-lechuga',
    category_id: 'extras',
    name: 'Extra Lechuga',
    description: 'Hojas frescas de lechuga.',
    price: 35,
    img: 'IMAGENES/LECHUGA.jpg',
    imgs: ['IMAGENES/LECHUGA.jpg']
  },
  {
    id: 'extra-tomate',
    category_id: 'extras',
    name: 'Extra Tomate',
    description: 'Rodajas de tomate fresco.',
    price: 35,
    img: 'IMAGENES/TOMATE.jpg',
    imgs: ['IMAGENES/TOMATE.jpg']
  }
];

const DEFAULT_BUILDER_STEPS = [
  {
    id: 'base',
    title: 'Tipo de proteína',
    multi: false,
    required: true,
    options: [
      { id: 'smash', name: 'Smash de carne vacuna', code: 'SM', price: 300 },
      { id: 'pollo', name: 'Pollo crispy crujiente', code: 'CR', price: 300 },
      { id: 'veggie', name: 'Patty vegetal artesanal', code: 'VG', price: 280 }
    ]
  },
  {
    id: 'qty',
    title: 'Cantidad de medallones',
    multi: false,
    required: false,
    options: [
      { id: 'single', name: 'Simple (1 Medallón)', code: 'S1', price: 0, label: 'incluido' },
      { id: 'double', name: 'Doble (2 Medallones)', code: 'D2', price: 120 },
      { id: 'triple', name: 'Triple (3 Medallones)', code: 'T3', price: 240 }
    ]
  },
  {
    id: 'bun',
    title: 'Tipo de Pan artesanal',
    multi: false,
    required: false,
    options: [
      { id: 'brioche', name: 'Pan Brioche mantecoso', code: 'BR', price: 0, label: 'incluido' },
      { id: 'clasico', name: 'Pan Clásico con sésamo', code: 'CL', price: 0, label: 'incluido' },
      { id: 'integral', name: 'Pan Integral con semillas', code: 'IN', price: 0, label: 'incluido' }
    ]
  },
  {
    id: 'cheese',
    title: 'Quesos fundidos',
    multi: true,
    required: false,
    options: [
      { id: 'cheddar', name: 'Cheddar americano', code: 'CH', price: 35 },
      { id: 'muzza', name: 'Mozzarella fundida', code: 'MZ', price: 35 },
      { id: 'provolone', name: 'Provolone parrillero', code: 'PV', price: 35 },
      { id: 'emmental', name: 'Queso Emmental', code: 'EM', price: 35 }
    ]
  },
  {
    id: 'sauces',
    title: 'Salsas de la casa',
    multi: true,
    required: false,
    cols3: true,
    options: [
      { id: 'legendary', name: 'Legendary Secreta', code: 'LG', price: 0, label: 'gratis' },
      { id: 'alioli', name: 'Alioli de ajo asado', code: 'AL', price: 0, label: 'gratis' },
      { id: 'bbq', name: 'Barbacoa BBQ ahumada', code: 'BQ', price: 0, label: 'gratis' },
      { id: 'mayo', name: 'Mayonesa casera', code: 'MY', price: 0, label: 'gratis' },
      { id: 'ketchup', name: 'Ketchup clásico', code: 'KT', price: 0, label: 'gratis' },
      { id: 'mostaza', name: 'Mostaza suave', code: 'MS', price: 0, label: 'gratis' }
    ]
  },
  {
    id: 'toppings',
    title: 'Toppings y Crujientes',
    multi: true,
    required: false,
    cols3: true,
    options: [
      { id: 'bacon', name: 'Bacon crujiente ahumado', code: 'BC', price: 35 },
      { id: 'cebolla', name: 'Cebolla caramelizada', code: 'CB', price: 35 },
      { id: 'pepinillos', name: 'Pepinillos agridulces', code: 'PK', price: 35 },
      { id: 'huevo', name: 'Huevo frito campero', code: 'HF', price: 35 },
      { id: 'aros', name: 'Aros de cebolla', code: 'AR', price: 35 },
      { id: 'jalapeno', name: 'Jalapeños en rodajas', code: 'JP', price: 35 },
      { id: 'lechuga', name: 'Lechuga fresca', code: 'LE', price: 35 },
      { id: 'tomate', name: 'Tomate fresco', code: 'TM', price: 35 },
      { id: 'hongos', name: 'Hongos salteados', code: 'HG', price: 35 }
    ]
  }
];

const DEFAULT_CONFIG = {
  wa_number: '59892454046',
  delivery_price: '150',
  panel_user: 'admin',
  panel_pass: 'legendary2024'
};

// Helper to get structured categories map
function buildCategoriesMap(categories, products) {
  const catsMap = {};
  categories.forEach(c => {
    catsMap[c.id] = { label: c.label, items: [] };
  });

  products.filter(p => p.is_active !== false).forEach(p => {
    if (catsMap[p.category_id]) {
      let itemImg = p.img;
      let itemImgs = p.imgs || (p.img ? [p.img] : []);

      catsMap[p.category_id].items.push({
        id: p.id,
        category_id: p.category_id,
        name: p.name,
        desc: p.description || '',
        price: parseFloat(p.price) || 0,
        img: itemImg,
        imgs: itemImgs,
        badge: p.badge || null,
        sponsor_name: p.sponsor_name || null,
        sponsor_logo: p.sponsor_logo || null,
        sponsor_color: p.sponsor_color || null,
        sponsor_badge: p.sponsor_badge || null,
        sponsor_url: p.sponsor_url || null
      });
    }
  });

  // Reordenar sponsors primero
  Object.values(catsMap).forEach(cat => {
    cat.items.sort((a, b) => {
      if (a.sponsor_name && !b.sponsor_name) return -1;
      if (!a.sponsor_name && b.sponsor_name) return 1;
      return 0;
    });
  });

  return catsMap;
}

if (typeof window !== 'undefined') {
  window.DEFAULT_CATEGORIES = DEFAULT_CATEGORIES;
  window.DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;
  window.DEFAULT_BUILDER_STEPS = DEFAULT_BUILDER_STEPS;
  window.DEFAULT_CONFIG = DEFAULT_CONFIG;
  window.buildCategoriesMap = buildCategoriesMap;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DEFAULT_CATEGORIES,
    DEFAULT_PRODUCTS,
    DEFAULT_BUILDER_STEPS,
    DEFAULT_CONFIG,
    buildCategoriesMap
  };
}
