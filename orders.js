/* =====================================================
   LEGENDARY BURGER — orders.js  v1.0
   -------------------------------------------------------
   Intercepta el botón "Enviar" del modal de confirmación:
     1. Guarda el pedido en Supabase (tabla: orders)
     2. Abre WhatsApp con la comanda (siempre, aunque
        Supabase falle — nunca pierdas un pedido)

   CÓMO INTEGRAR:
     Cargá este archivo DESPUÉS de cart.js en index.html:
       <script src="cart.js"></script>
       <script src="orders.js"></script>   ← este

   REQUIERE en el scope global (ya definidos en index.html):
     sbClient, cart, WA, buildComanda,
     getSubtotal, getDeliveryFee, getTotal,
     deliveryMode, selectedPayment, save, $
   ===================================================== */

// ── Override de sendOrder (reemplaza la de cart.js) ───
async function sendOrder() {
  if(!cart.length){toast('Agrega algo al pedido primero');return}
  
  const name    = $('#custName')?.value.trim()    ?? '';
  const phone   = $('#custPhone')?.value.trim()   ?? '';
  const address = $('#custAddress')?.value.trim() ?? '';
  const notes   = $('#custNotes')?.value.trim()   ?? '';

  if (!name || !phone) {
    toast('Ingresá tu nombre y teléfono por favor');
    return;
  }
  if (deliveryMode === 'envio' && !address) {
    toast('Ingresá tu dirección para el envío');
    return;
  }

  const btn = $('#ocbSend');

  // UI: estado cargando
  if (btn) {
    btn.disabled     = true;
    btn.classList.add('loading');
    btn.innerHTML    = '<span>⏳ ENVIANDO...</span>';
  }

  try {
    const subtotal    = getSubtotal() || 0;
    const deliveryFee = getDeliveryFee() || 0;
    const total       = getTotal() || 0;
    const comandaText = buildComanda();

    // ── 2. Armar el objeto de pedido ──────────────────
    const orderPayload = {
      customer_name:    name,
      customer_phone:   phone,
      customer_address: address || null,
      delivery_mode:    deliveryMode,
      payment_method:   selectedPayment,
      payment_change:   (typeof change !== 'undefined' ? change : null),
      notes:            notes || null,
      items: cart.map(item => ({
        id:         item.id,
        name:       item.name,
        qty:        item.qty,
        unit_price: item.price,
        line_total: item.price * item.qty
      })),
      subtotal,
      delivery_fee: deliveryFee,
      total,
      comanda: comandaText,
      status: 'nuevo'
    };

    // ── 3. Guardar en Supabase (Simple Insert) ────────
    const { error: sbError } = await sbClient
      .from('orders')
      .insert([orderPayload]);

    if (sbError) {
      console.error('[orders.js] Error Supabase:', sbError);
      alert('Error al guardar en base de datos: ' + sbError.message + '\n\nEl pedido se enviará por WhatsApp igualmente.');
    } else {
      console.log('[orders.js] ✅ Pedido guardado correctamente.');
    }

  } catch (err) {
    console.error('[orders.js] Error inesperado:', err);
    alert('Error inesperado: ' + err.message);
  } finally {
    // ── 4. Siempre abrir WhatsApp ──
    const waUrl = `https://wa.me/${WA}?text=${encodeURIComponent(buildComanda())}`;
    window.open(waUrl, '_blank');

    // ── 5. Restaurar botón y limpiar ──
    if (btn) {
      btn.disabled      = false;
      btn.classList.remove('loading');
      btn.innerHTML     = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-top:-2px"><path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.641-2.543 3.841-2.543 6.161 0 1.5.385 2.96 1.114 4.247L3.109 23.5l4.512-1.185a8.65 8.65 0 004.41 1.205h.004c2.32 0 4.519-.903 6.16-2.544 1.64-1.641 2.543-3.841 2.543-6.161 0-2.321-.903-4.519-2.544-6.161a8.657 8.657 0 00-6.163-2.54zM12.031 7.422c1.989 0 3.858.775 5.263 2.181 1.406 1.406 2.18 3.275 2.18 5.263 0 1.989-.775 3.858-2.181 5.263-1.406 1.406-3.275 2.18-5.263 2.18h-.003c-1.285 0-2.555-.334-3.673-.966l-.263-.149-2.73.716.728-2.66-.164-.261a7.394 7.394 0 01-1.135-3.963c0-1.989.775-3.858 2.181-5.263 1.406-1.406 3.275-2.18 5.263-2.18zm4.332 5.867l-1.583-.791c-.287-.144-.475-.121-.663.12l-.76 1.012c-.143.19-.332.237-.617.095-.285-.143-1.205-.445-2.296-1.417-.85-.757-1.422-1.691-1.588-1.976-.166-.285-.018-.439.124-.581.129-.127.285-.332.427-.5.143-.166.19-.285.285-.475.095-.19.047-.356-.024-.5-.071-.143-.663-1.594-.91-2.183-.241-.573-.484-.494-.663-.504l-.565-.01c-.19 0-.5.071-.76.356-.261.285-1 1.012-1 2.47s1.059 2.873 1.205 3.063c.143.19 2.083 3.181 5.047 4.462.705.305 1.256.487 1.684.623.708.226 1.353.194 1.862.118.568-.085 1.745-.712 1.994-1.399.25-.688.25-1.278.175-1.401-.075-.124-.261-.19-.547-.333z"/></svg> ENVIAR POR WHATSAPP`;
    }

    setTimeout(() => { cart = []; save(); }, 400);
  }
}

console.log('[orders.js] ✅ sendOrder() con Supabase registrado correctamente.');
