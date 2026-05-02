const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dwgwbnalrbzvakzbiwmb.supabase.co';
const SUPABASE_KEY = '[ELIMINATED_FOR_SECURITY]'; // Usar Service Role Key para migración

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const catsBase = {
  carne:{label:'Burger de Carne',items:[
    {id:'texas',name:'Texas Crispy',desc:'Smash de carne, bacon, salsa BBQ, cheddar, emmental x2, cebolla crispy y huevo frito.',price:390,img:'IMAGENES/Texas Crispy/Texas Crispy.jpg',imgs:['IMAGENES/Texas Crispy/Texas Crispy.jpg','IMAGENES/Texas Crispy/Texas Crispy 2.jpg'],badge:'ESTRELLA'},
    {id:'only',name:'Only Cheese',desc:'Smash de carne, bacon, medallon de provolone, salsa BBQ y cheddar x2.',price:390,img:'IMAGENES/Only Chesse.jpg'},
    {id:'triple',name:'Triple Cheese',desc:'Doble smash de carne, cheddar x4, salsa Legendary y cebolla.',price:480,img:'IMAGENES/Triple Chesse/triple chesse 1.jpg',imgs:['IMAGENES/Triple Chesse/triple chesse 1.jpg','IMAGENES/Triple Chesse/triple chesse 2.jpg','IMAGENES/Triple Chesse/triple chesse 3.jpg']},
    {id:'onion-rings',name:'Onion Rings',desc:'Smash de carne, aros de cebolla x3, muzza x3, mayonesa burger house y bacon.',price:390,img:'IMAGENES/Oniong Rings/Oniong Rings.jpg',imgs:['IMAGENES/Oniong Rings/Oniong Rings.jpg','IMAGENES/Oniong Rings/Oniong Rings 2.jpg','IMAGENES/Oniong Rings/Oniong Rings 3.jpg']},
    {id:'moon',name:'Moon Burger',desc:'Smash de carne, cheddar x2, salsa barbacoa y cebolla caramelizada.',price:390,img:null},
    {id:'big-legend',name:'Big Legend',desc:'Doble smash de carne, bacon, salsa Legendary, cheddar x4 y pepinillos.',price:480,img:'IMAGENES/Big Legend/Big Legend.jpg',imgs:['IMAGENES/Big Legend/Big Legend.jpg','IMAGENES/Big Legend/Big Legend 2.jpg'],badge:'TOP'},
    {id:'kids',name:'Kids Burger',desc:'Smash de carne, cheddar x3 y salsa a eleccion.',price:350,img:'IMAGENES/kid.jpg'}]},
  pollo:{label:'Otras Burgers',items:[
    {id:'crispy-bacon',name:'Crispy Bacon',desc:'Pollo crispy, bacon, tomate, cheddar x2 y alioli.',price:380,img:'IMAGENES/Crispy Bacon.jpg'},
    {id:'crispy-mix',name:'Crispy Mix',desc:'Pollo crispy, cheddar y ensalada coleslaw.',price:380,img:'IMAGENES/Crispy MIX.jpg'}]},
  veggie:{label:'Veggie',items:[{id:'veggie',name:'Veggie LGY',desc:'Medallon vegetal, huevo frito, emmental, lechuga, tomate y alioli.',price:370,img:'IMAGENES/Vegetariana LGY.jpg'}]},
  milas:{label:'Milanesas y Chivitos',items:[
    {id:'mila-americana',name:'Milanesa Americana',desc:'Milanesa de carne, panceta, huevo y salsa BBQ.',price:420,img:'IMAGENES/Mila Americana.jpg'},
    {id:'mila-napo',name:'Milanesa Napolitana',desc:'Milanesa de carne, jamon, mozzarella y salsa de tomate.',price:420,img:'IMAGENES/napo.jpg'},
    {id:'chivito',name:'Chivito Legendario',desc:'Lomo tiernizado, jamon, mozzarella, bacon, huevo frito, aceituna, lechuga, tomate y mayonesa.',price:435,img:'IMAGENES/Chivito Legendario/chivito legendario.jpg',badge:'TOP'}]},
  papas:{label:'Papas',items:[
    {id:'papas',name:'Papas',desc:'Porcion de papas fritas.',price:200,img:'IMAGENES/fritas.jpg'},
    {id:'papas-cheddar',name:'Papas Cheddar',desc:'Papas con salsa cheddar caliente.',price:240,img:'IMAGENES/fritas cheddar.jpg'},
    {id:'papas-bacon',name:'Papas Cheddar y Bacon',desc:'Papas con cheddar y bacon crujiente.',price:280,img:'IMAGENES/papas  cheddar bacon.jpg'}]},
  extras:{label:'Extras en Burger',items:[
    {id:'extra-bacon',name:'Bacon',desc:'Extra para sumar a tu burger.',price:35,img:null},
    {id:'extra-aros',name:'Aros de cebolla',desc:'Extra para sumar a tu burger.',price:35,img:'IMAGENES/Oniong Rings/Oniong Rings.jpg'},
    {id:'extra-huevo',name:'Huevo',desc:'Extra para sumar a tu burger.',price:35,img:null},
    {id:'extra-lechuga',name:'Lechuga',desc:'Extra para sumar a tu burger.',price:35,img:null},
    {id:'extra-tomate',name:'Tomate',desc:'Extra para sumar a tu burger.',price:35,img:null},
    {id:'extra-carne-cheddar',name:'Carne mas cheddar',desc:'Medallon extra con cheddar.',price:90,img:null}]},
  bebidas:{label:'Bebidas',items:[
    {id:'coca',name:'Linea Coca Cola 600ml',desc:'Refresco linea Coca Cola.',price:130,img:null},
    {id:'agua',name:'Aguas',desc:'Agua con gas o sin gas.',price:100,img:null},
    {id:'cabezas-botella',name:'Cabezas Bier Botella',desc:'Cerveza artesanal en botella.',price:270,img:null},
    {id:'cabezas-lata',name:'Cabezas Bier Lata',desc:'Cerveza artesanal en lata.',price:170,img:null},
    {id:'cabezas-tirada',name:'Cabezas Bier Tirada',desc:'Cerveza artesanal tirada.',price:250,img:null},
    {id:'cabezas-gintonic',name:'Cabezas Bier Gintonic',desc:'Gintonic de Cabezas Bier.',price:250,img:null},
    {id:'brik-330',name:'Cerveza Brik 330',desc:'Cerveza Brik 330 ml.',price:110,img:null},
    {id:'stella',name:'Cerveza Stella Artois',desc:'Cerveza Stella Artois.',price:300,img:null},
    {id:'moreiz-negra',name:'Moreiz Etiqueta Negra',desc:'Vino Moreiz etiqueta negra.',price:295,img:null},
    {id:'moreiz-blanca',name:'Moreiz Etiqueta Blanca',desc:'Vino Moreiz etiqueta blanca.',price:198,img:null}]}
};

async function migrate() {
  console.log('--- Iniciando migración ---');
  
  for (const [catId, cat] of Object.entries(catsBase)) {
    console.log(`Migrando categoría: ${cat.label}`);
    await supabase.from('categories').upsert({ id: catId, label: cat.label });
    
    for (const item of cat.items) {
      console.log(`  > Migrando producto: ${item.name}`);
      await supabase.from('products').upsert({
        id: item.id,
        category_id: catId,
        name: item.name,
        description: item.desc,
        price: item.price,
        img: item.img,
        imgs: item.imgs || (item.img ? [item.img] : []),
        badge: item.badge
      });
    }
  }
  
  console.log('--- Migración finalizada ---');
}

migrate();
