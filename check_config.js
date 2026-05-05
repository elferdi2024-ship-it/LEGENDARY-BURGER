// filepath: d:/PROYECTOS/burgaa/check_config.js
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  console.log('Checking site_config...');
  const { data, error } = await supabase.from('site_config').select('*');
  if (error) {
    console.error('Error selecting from site_config:', error.message);
  } else {
    console.log('Data:', data);
  }
}

check();
