
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const sponsorProducts = [
  {
    id: 'pepsi-500',
    category_id: 'bebidas',
    name: 'Pepsi 500ml',
    description: 'Refrescante sabor original. El acompañamiento ideal para tu Legendary Burger.',
    price: 130,
    img: 'https://images.ofix.com.mx/media/catalog/product/p/e/pepsi_500ml_1.png',
    imgs: [],
    badge: 'SPONSORED',
    sponsor_name: 'Pepsi',
    sponsor_logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg',
    sponsor_color: '#005cb4',
    // sponsor_badge: 'REFRESCO OFICIAL', // Omitiendo por ahora hasta que sepa si la columna existe
    featured: true
  },
  {
    id: 'cabezas-bier-rubia',
    category_id: 'bebidas',
    name: 'Cabezas Bier - Rubia',
    description: 'Cerveza artesanal uruguaya premium. Sabor equilibrado y refrescante.',
    price: 220,
    img: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Rubia-Cabezas-Bier.png',
    imgs: [],
    badge: 'ARTESANAL',
    sponsor_name: 'Cabezas Bier',
    sponsor_logo: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Logo-Cabezas-Bier-Blanco.png',
    sponsor_color: '#f5e6c8',
    // sponsor_badge: 'CERVEZA OFICIAL', // Omitiendo por ahora
    featured: true
  }
];

async function fix() {
  console.log('Verificando columnas en la tabla products...');
  // Intentar un select simple para ver qué columnas hay
  const { data: cols, error: errCols } = await sb.from('products').select('*').limit(1);
  if (errCols) {
      console.error('Error al leer tabla:', errCols.message);
      return;
  }
  
  const existingCols = Object.keys(cols[0] || {});
  console.log('Columnas encontradas:', existingCols.join(', '));

  console.log('Inyectando productos de sponsors...');
  for (const p of sponsorProducts) {
    // Solo incluir campos que existan en la DB
    const cleanProduct = {};
    Object.keys(p).forEach(key => {
        if (existingCols.includes(key) || ['id', 'category_id', 'name', 'description', 'price', 'img', 'imgs', 'badge'].includes(key)) {
            cleanProduct[key] = p[key];
        }
    });

    const { error } = await sb.from('products').upsert(cleanProduct);
    if (error) console.error(`Error en ${p.name}:`, error.message);
    else console.log(`✓ ${p.name} inyectado correctamente.`);
  }
}

fix();
