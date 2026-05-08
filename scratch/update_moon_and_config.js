// filepath: scratch/update_moon_and_config.js
// 1. Agregar imagen a Moon Burger en Supabase
// 2. Actualizar wa_number en site_config

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  // 1. Agregar imagen a Moon Burger
  console.log('Actualizando Moon Burger con imagen...');
  const { error: moonErr } = await sb.from('products').update({
    img: 'IMAGENES/Moon.jpeg',
    imgs: ['IMAGENES/Moon.jpeg']
  }).eq('id', 'moon');
  
  if (moonErr) console.error('Error Moon:', moonErr.message);
  else console.log('✓ Moon Burger actualizada con imagen.');

  // 2. Actualizar WhatsApp
  console.log('Actualizando WhatsApp...');
  const { error: waErr } = await sb.from('site_config').upsert({
    key: 'wa_number',
    value: '59892454046'
  });
  
  if (waErr) console.error('Error WA:', waErr.message);
  else console.log('✓ WhatsApp actualizado a 59892454046.');

  console.log('--- Listo ---');
}

run();
