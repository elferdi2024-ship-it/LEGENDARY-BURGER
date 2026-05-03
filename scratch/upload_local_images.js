
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3Z3dibmFscmJ6dmFremJpd21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ4OTEsImV4cCI6MjA5MzI5MDg5MX0.im55Wn6fWcQddwaiRgZx1umKYPI2y0fwW0_RuP51ZR0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const imagesToUpload = [
    { localPath: 'IMAGENES/LECHUGA.jpg', productName: 'Lechuga' },
    { localPath: 'IMAGENES/HUEVO.jpg', productName: 'Huevo' },
    { localPath: 'IMAGENES/BACON.jpg', productName: 'Bacon' },
    { localPath: 'IMAGENES/TOMATE.jpg', productName: 'Tomate' }
];

async function run() {
    for (const item of imagesToUpload) {
        try {
            const fileName = path.basename(item.localPath);
            const fileBuffer = fs.readFileSync(item.localPath);
            const storagePath = `manual_${Date.now()}_${fileName}`;

            console.log(`Subiendo ${fileName}...`);
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('products')
                .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(storagePath);
            console.log(`URL Generada: ${publicUrl}`);

            // Buscar producto por nombre (aproximado)
            const { data: products, error: searchError } = await supabase
                .from('products')
                .select('id, imgs')
                .ilike('name', `%${item.productName}%`);

            if (searchError) throw searchError;

            if (products && products.length > 0) {
                for (const p of products) {
                    const currentImgs = Array.isArray(p.imgs) ? p.imgs : [];
                    const newImgs = [...currentImgs, publicUrl];
                    
                    const { error: updateError } = await supabase
                        .from('products')
                        .update({ img: publicUrl, imgs: newImgs })
                        .eq('id', p.id);

                    if (updateError) throw updateError;
                    console.log(`✅ Producto "${item.productName}" (ID: ${p.id}) actualizado.`);
                }
            } else {
                console.log(`⚠️ No se encontró producto para "${item.productName}".`);
            }

        } catch (err) {
            console.error(`❌ Error con ${item.productName}:`, err.message);
        }
    }
}

run();
