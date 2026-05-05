
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const sponsorData = [
  {
    id: 'pepsi-500',
    sponsor_name: 'Pepsi',
    sponsor_logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg',
    sponsor_color: '#005cb4',
    sponsor_badge: 'REFRESCO OFICIAL',
    featured: true
  },
  {
    id: 'cabezas-bier-rubia',
    sponsor_name: 'Cabezas Bier',
    sponsor_logo: 'https://cabezasbier.uy/wp-content/uploads/2021/05/Logo-Cabezas-Bier-Blanco.png',
    sponsor_color: '#d4af37',
    sponsor_badge: 'CERVEZA OFICIAL',
    featured: true
  }
];

async function updateSponsors() {
  console.log('Actualizando branding de sponsors...');
  for (const p of sponsorData) {
    const { error } = await sb.from('products').update(p).eq('id', p.id);
    if (error) console.error(`Error en ${p.id}:`, error.message);
    else console.log(`✓ Branding de ${p.sponsor_name} aplicado.`);
  }
}

updateSponsors();
