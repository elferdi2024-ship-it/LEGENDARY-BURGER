
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const beerVarieties = [
  {
    id: 'cabezas-bier-ipa',
    category_id: 'bebidas',
    name: 'Cabezas Bier - IPA',
    description: 'Cerveza artesanal con carácter. Notas cítricas y un amargor persistente ideal para burgers intensas.',
    price: 240,
    img: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Ipa-Cabezas-Bier.png',
    badge: 'ARTESANAL',
    sponsor_name: 'Cabezas Bier',
    sponsor_logo: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Logo-Cabezas-Bier-Blanco.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'CERVEZA OFICIAL',
    featured: true
  },
  {
    id: 'cabezas-bier-scotch',
    category_id: 'bebidas',
    name: 'Cabezas Bier - Scotch',
    description: 'Cerveza negra con notas a malta tostada y caramelo. Cuerpo robusto y final dulce.',
    price: 240,
    img: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Scotch-Cabezas-Bier.png',
    badge: 'ARTESANAL',
    sponsor_name: 'Cabezas Bier',
    sponsor_logo: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Logo-Cabezas-Bier-Blanco.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'CERVEZA OFICIAL',
    featured: true
  }
];

async function addBeers() {
  console.log('Agregando variedades de Cabezas Bier...');
  for (const b of beerVarieties) {
    const { error } = await sb.from('products').upsert(b);
    if (error) console.error(`Error en ${b.name}:`, error.message);
    else console.log(`✓ ${b.name} agregada con branding.`);
  }
}

addBeers();
