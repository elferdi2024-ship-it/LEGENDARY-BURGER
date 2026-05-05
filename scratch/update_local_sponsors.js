
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

async function updateLocalPaths() {
  console.log('Actualizando rutas de logos a archivos locales...');

  // Actualizar productos de Pepsi
  await sb.from('products')
    .update({ sponsor_logo: 'SPONSORS/pepsi-logo.png' })
    .eq('sponsor_name', 'Pepsi');

  // Actualizar productos de Cabezas Bier
  await sb.from('products')
    .update({ sponsor_logo: 'SPONSORS/cabezas-bier-logo.png' })
    .eq('sponsor_name', 'Cabezas Bier');

  console.log('✓ Rutas de logos actualizadas en la base de datos.');
}

updateLocalPaths();
