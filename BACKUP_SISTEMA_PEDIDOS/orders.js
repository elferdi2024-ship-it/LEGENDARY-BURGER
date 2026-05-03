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
  const overlay = $('#orderConfirmOverlay');
  const btn     = $('#ocbSend');

  // UI: estado cargando
  if (btn) {
    btn.disabled     = true;
    btn.textContent  = '⏳ Enviando...';
    btn.style.opacity = '0.7';
  }

  try {
    // ── 1. Recopilar datos del formulario ─────────────
    const name    = $('#custName')?.value.trim()    ?? '';
    const phone   = $('#custPhone')?.value.trim()   ?? '';
    const address = $('#custAddress')?.value.trim() ?? '';
    const notes   = $('#custNotes')?.value.trim()   ?? '';
    const change  = $('#custChange')?.value.trim()  ?? '';

    const subtotal    = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const total       = getTotal();
    const comanda     = buildComanda();

    // ── 2. Armar el objeto de pedido ──────────────────
    const orderPayload = {
      customer_name:    name,
      customer_phone:   phone,
      customer_address: address || null,
      delivery_mode:    deliveryMode,              // 'retiro' | 'envio'
      payment_method:   selectedPayment,           // 'efectivo' | 'transferencia' | 'mercadopago'
      payment_change:   change   || null,
      notes:            notes    || null,
      items: cart.map(item => ({
        id:                  item.id,
        name:                item.name,
        qty:                 item.qty,
        unit_price:          item.price,
        line_total:          item.price * item.qty,
        removed_ingredients: item.removedIngredients ?? [],
      })),
      subtotal,
      delivery_fee: deliveryFee,
      total,
      comanda,                   // texto plano para WhatsApp / referencia
      status: 'nuevo',
    };

    // ── 3. Guardar en Supabase ────────────────────────
    const { data: savedOrder, error: sbError } = await sbClient
      .from('orders')
      .insert(orderPayload)
      .select('id, created_at')
      .single();

    if (sbError) {
      // No bloqueamos el flujo — el pedido igual llega por WhatsApp
      console.error('[orders.js] Error guardando en Supabase:', sbError.message);
    } else {
      console.log('[orders.js] ✅ Pedido guardado:', savedOrder?.id);
    }

  } catch (err) {
    // Error inesperado — tampoco bloqueamos
    console.error('[orders.js] Error inesperado:', err);

  } finally {
    // ── 4. Siempre abrir WhatsApp (la comanda es el respaldo) ──
    const waUrl = `https://wa.me/${WA}?text=${encodeURIComponent(buildComanda())}`;
    window.open(waUrl, '_blank');

    // ── 5. Cerrar modal ───────────────────────────────
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('menu-open');

    // ── 6. Restaurar botón ────────────────────────────
    if (btn) {
      btn.disabled      = false;
      btn.textContent   = 'Enviar por WhatsApp';
      btn.style.opacity = '1';
    }

    // ── 7. Vaciar carrito ─────────────────────────────
    //    Usamos un pequeño delay para que la animación
    //    de cierre del modal se vea suave.
    setTimeout(() => {
      cart = [];
      save();
    }, 400);
  }
}

console.log('[orders.js] ✅ sendOrder() con Supabase registrado correctamente.');
