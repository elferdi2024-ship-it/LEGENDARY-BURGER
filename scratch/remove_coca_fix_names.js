// filepath: scratch/remove_coca_fix_names.js
// 1. Eliminar producto Coca-Cola de Supabase
// 2. Corregir "Cabezas" → "Cabesas" en nombres de productos y sponsor_name

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  // 1. Eliminar Coca-Cola
  console.log('Eliminando Coca-Cola...');
  const { error: delErr } = await sb.from('products').delete().eq('id', 'coca');
  if (delErr) console.error('Error eliminando coca:', delErr.message);
  else console.log('✓ Coca-Cola eliminada.');

  // 2. Buscar todos los productos que tengan "Cabezas" en el nombre
  const { data: products, error: fetchErr } = await sb.from('products').select('*').ilike('name', '%Cabezas%');
  if (fetchErr) { console.error('Error buscando:', fetchErr.message); return; }

  console.log(`Encontrados ${products?.length || 0} productos con "Cabezas" en el nombre`);

  for (const p of (products || [])) {
    const updates = {};
    if (p.name && p.name.includes('Cabezas')) {
      updates.name = p.name.replace(/Cabezas/g, 'Cabesas');
    }
    if (p.sponsor_name && p.sponsor_name.includes('Cabezas')) {
      updates.sponsor_name = p.sponsor_name.replace(/Cabezas/g, 'Cabesas');
    }
    if (p.description && p.description.includes('Cabezas')) {
      updates.description = p.description.replace(/Cabezas/g, 'Cabesas');
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await sb.from('products').update(updates).eq('id', p.id);
      if (error) console.error(`Error actualizando ${p.id}:`, error.message);
      else console.log(`✓ ${p.id}: ${JSON.stringify(updates)}`);
    }
  }

  console.log('--- Listo ---');
}

run();
