
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const pepsi = {
  id: 'pepsi-500',
  category_id: 'bebidas',
  name: 'Pepsi 500ml',
  description: 'Refrescante sabor original. El acompañamiento ideal para tu Legendary Burger.',
  price: 130,
  img: 'https://images.ofix.com.mx/media/catalog/product/p/e/pepsi_500ml_1.png',
  badge: 'SPONSORED',
  sponsor_name: 'Pepsi',
  sponsor_logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg',
  sponsor_color: '#005cb4',
  sponsor_badge: 'REFRESCO OFICIAL',
  featured: true
};

async function restorePepsi() {
  console.log('Restaurando Pepsi 500ml como excepción autorizada...');
  const { error } = await sb.from('products').upsert(pepsi);
  if (error) console.error('Error:', error.message);
  else console.log('✓ Pepsi 500ml restaurada con branding.');
}

restorePepsi();
