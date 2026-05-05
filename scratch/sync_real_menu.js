
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const realProducts = [
  // Cabezas Bier
  { id: 'cb-botella', category_id: 'bebidas', name: 'Cabezas Bier Botella', price: 270, sponsor_name: 'Cabezas Bier', sponsor_logo: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Logo-Cabezas-Bier-Blanco.png', sponsor_color: '#d4af37', sponsor_badge: 'PREMIUM' },
  { id: 'cb-lata', category_id: 'bebidas', name: 'Cabezas Bier Lata', price: 170, sponsor_name: 'Cabezas Bier', sponsor_logo: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Logo-Cabezas-Bier-Blanco.png', sponsor_color: '#d4af37' },
  { id: 'cb-tirada', category_id: 'bebidas', name: 'Cabezas Bier Tirada', price: 250, sponsor_name: 'Cabezas Bier', sponsor_logo: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Logo-Cabezas-Bier-Blanco.png', sponsor_color: '#d4af37' },
  { id: 'cb-gintonic', category_id: 'bebidas', name: 'Cabezas Bier Gintonic', price: 250, sponsor_name: 'Cabezas Bier', sponsor_logo: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Logo-Cabezas-Bier-Blanco.png', sponsor_color: '#d4af37' },
  
  // Otras Cervezas
  { id: 'brok-330', category_id: 'bebidas', name: 'Brok 330', price: 110 },
  { id: 'stella-artois', category_id: 'bebidas', name: 'Stella Artois', price: 300 },
  
  // Vinos
  { id: 'moreiz-negra', category_id: 'bebidas', name: 'Moreiz Etiqueta Negra', price: 295 },
  { id: 'moreiz-blanca', category_id: 'bebidas', name: 'Moreiz Etiqueta Blanca', price: 198 },
  
  // Refrescos
  { id: 'coca', category_id: 'bebidas', name: 'Linea Coca Cola 600ml', price: 130 },
  { id: 'agua', category_id: 'bebidas', name: 'Aguas', price: 100 }
];

async function syncMenu() {
  console.log('Sincronizando menú con imágenes reales...');
  
  // 1. Eliminar inventados
  await sb.from('products').delete().in('id', ['pepsi-500', 'cabezas-bier-rubia', 'cabezas-bier-ipa', 'cabezas-bier-scotch']);
  console.log('✓ Productos anteriores eliminados.');

  // 2. Insertar reales
  for (const p of realProducts) {
    const { error } = await sb.from('products').upsert(p);
    if (error) console.error(`Error en ${p.name}:`, error.message);
    else console.log(`✓ ${p.name} sincronizado.`);
  }
}

syncMenu();
