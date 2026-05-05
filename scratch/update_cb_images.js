
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const updates = [
  {
    id: 'cb-botella',
    img: 'IMAGENES/CABEZAS BIER BOTELLA/imgi_115_BlondeAle_3-compressor.jpg',
    imgs: [
      'IMAGENES/CABEZAS BIER BOTELLA/imgi_115_BlondeAle_3-compressor.jpg',
      'IMAGENES/CABEZAS BIER BOTELLA/imgi_100_DobleIpa_1-compressor.jpg',
      'IMAGENES/CABEZAS BIER BOTELLA/imgi_101_DobleIpa_2-compressor.jpg'
    ]
  },
  {
    id: 'cb-lata',
    img: 'IMAGENES/CABEZAS BIER LATA/imgi_82_LatasPATRIA_00.jpg',
    imgs: ['IMAGENES/CABEZAS BIER LATA/imgi_82_LatasPATRIA_00.jpg']
  },
  {
    id: 'cb-gintonic',
    img: 'IMAGENES/Cabezas bier gin/imgi_24_ch_gintonic-980x980.png',
    imgs: ['IMAGENES/Cabezas bier gin/imgi_24_ch_gintonic-980x980.png']
  }
];

async function updateImages() {
  console.log('Actualizando imágenes de productos Cabezas Bier...');
  for (const u of updates) {
    const { error } = await sb.from('products').update({ img: u.img, imgs: u.imgs }).eq('id', u.id);
    if (error) console.error(`Error en ${u.id}:`, error.message);
    else console.log(`✓ Imágenes de ${u.id} actualizadas.`);
  }
}

updateImages();
