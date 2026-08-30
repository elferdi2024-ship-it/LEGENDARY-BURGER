// filepath: d:/PROYECTOS/burgaa/orders.js
/* =====================================================
   LEGENDARY BURGER — orders.js  v2.0
   Enterprise Order Processing (LocalStorage + Supabase + WhatsApp)
   ===================================================== */

async function sendOrder() {
  if (!cart || !cart.length) {
    if (typeof toast === 'function') toast('Agregá algo al pedido primero 🍔');
    return;
  }
  
  const name    = $('#custName')?.value.trim()    ?? '';
  const phone   = $('#custPhone')?.value.trim()   ?? '';
  const address = $('#custAddress')?.value.trim() ?? '';
  const notes   = $('#custNotes')?.value.trim()   ?? '';

  if (!name || !phone) {
    if (typeof toast === 'function') toast('Ingresá tu nombre y teléfono por favor 📱');
    return;
  }
  if (deliveryMode === 'envio' && !address) {
    if (typeof toast === 'function') toast('Ingresá tu dirección para el envío 📍');
    return;
  }

  const btn = $('#ocbSend');

  // UI: estado cargando
  if (btn) {
    btn.disabled     = true;
    btn.classList.add('loading');
    btn.innerHTML    = '<span>⏳ PROCESANDO PEDIDO...</span>';
  }

  const orderId = 'ORD-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  const subtotal    = typeof getSubtotal === 'function' ? getSubtotal() : 0;
  const deliveryFee = typeof getDeliveryFee === 'function' ? getDeliveryFee() : 0;
  const total       = typeof getTotal === 'function' ? getTotal() : subtotal;
  const comandaText = typeof buildComanda === 'function' ? buildComanda() : '';

  const orderPayload = {
    id:               orderId,
    created_at:       new Date().toISOString(),
    customer_name:    name,
    customer_phone:   phone,
    customer_address: address || null,
    delivery_mode:    typeof deliveryMode !== 'undefined' ? deliveryMode : 'retiro',
    payment_method:   typeof selectedPayment !== 'undefined' ? selectedPayment : 'efectivo',
    payment_change:   (typeof change !== 'undefined' ? change : null),
    notes:            notes || null,
    items: cart.map(item => ({
      id:                 item.id,
      name:               item.name,
      qty:                item.qty,
      unit_price:         item.price,
      line_total:         item.price * item.qty,
      removedIngredients: item.removedIngredients || []
    })),
    subtotal,
    delivery_fee: deliveryFee,
    total,
    comanda: comandaText,
    status: 'nuevo'
  };

  // 1. Guardar siempre localmente para Demo & Resiliencia KDS
  try {
    const existingOrders = JSON.parse(localStorage.getItem('lb_orders') || '[]');
    existingOrders.unshift(orderPayload);
    localStorage.setItem('lb_orders', JSON.stringify(existingOrders));
    
    // Notificar eventos para tabs abiertos del Panel de Cocina
    window.dispatchEvent(new CustomEvent('lb_order_created', { detail: orderPayload }));
    localStorage.setItem('lb_last_order_ping', Date.now().toString());
  } catch (e) {
    console.warn('[orders.js] Error guardando en local storage:', e);
  }

  // 2. Guardar en Supabase si está disponible (con timeout de 2s para no trabar)
  if (typeof sbClient !== 'undefined' && sbClient) {
    try {
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout Supabase')), 2000));
      const insertPromise = sbClient.from('orders').insert([orderPayload]);
      await Promise.race([insertPromise, timeoutPromise]);
      console.log('[orders.js] ✅ Pedido sincronizado con Supabase');
    } catch (sbErr) {
      console.warn('[orders.js] Supabase no disponible o timeout, pedido guardado localmente:', sbErr.message);
    }
  }

  // 3. Abrir WhatsApp con la comanda
  const targetWA = (typeof WA !== 'undefined' && WA) ? WA : '59892454046';
  const waUrl = `https://wa.me/${targetWA}?text=${encodeURIComponent(comandaText)}`;
  window.open(waUrl, '_blank');

  if (typeof toast === 'function') {
    toast('¡Pedido confirmado! Enviando por WhatsApp 🚀');
  }

  // 4. Restaurar botón y limpiar carrito
  if (btn) {
    btn.disabled      = false;
    btn.classList.remove('loading');
    btn.innerHTML     = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-top:-2px"><path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.641-2.543 3.841-2.543 6.161 0 1.5.385 2.96 1.114 4.247L3.109 23.5l4.512-1.185a8.65 8.65 0 004.41 1.205h.004c2.32 0 4.519-.903 6.16-2.544 1.64-1.641 2.543-3.841 2.543-6.161 0-2.321-.903-4.519-2.544-6.161a8.657 8.657 0 00-6.163-2.54zM12.031 7.422c1.989 0 3.858.775 5.263 2.181 1.406 1.406 2.18 3.275 2.18 5.263 0 1.989-.775 3.858-2.181 5.263-1.406 1.406-3.275 2.18-5.263 2.18h-.003c-1.285 0-2.555-.334-3.673-.966l-.263-.149-2.73.716.728-2.66-.164-.261a7.394 7.394 0 01-1.135-3.963c0-1.989.775-3.858 2.181-5.263 1.406-1.406 3.275-2.18 5.263-2.18zm4.332 5.867l-1.583-.791c-.287-.144-.475-.121-.663.12l-.76 1.012c-.143.19-.332.237-.617.095-.285-.143-1.205-.445-2.296-1.417-.85-.757-1.422-1.691-1.588-1.976-.166-.285-.018-.439.124-.581.129-.127.285-.332.427-.5.143-.166.19-.285.285-.475.095-.19.047-.356-.024-.5-.071-.143-.663-1.594-.91-2.183-.241-.573-.484-.494-.663-.504l-.565-.01c-.19 0-.5.071-.76.356-.261.285-1 1.012-1 2.47s1.059 2.873 1.205 3.063c.143.19 2.083 3.181 5.047 4.462.705.305 1.256.487 1.684.623.708.226 1.353.194 1.862.118.568-.085 1.745-.712 1.994-1.399.25-.688.25-1.278.175-1.401-.075-.124-.261-.19-.547-.333z"/></svg> ENVIAR POR WHATSAPP`;
  }

  setTimeout(() => {
    cart = [];
    if (typeof save === 'function') save();
  }, 400);
}

console.log('[orders.js] ✅ sendOrder() v2.0 registrado.');
