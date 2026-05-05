# 🍔 Legendary Burger — Sistema de Sponsorship Premium

Este documento integra UX, UI, marketing y desarrollo para implementar publicidad nativa (no invasiva) dentro de tu web.

---

# 1. 🎯 Estrategia General

Objetivo:
- Monetizar tráfico con sponsors (Pepsi, Cabezas Bier)
- Aumentar ticket promedio
- Mantener estética premium

Principios:
- Publicidad nativa (no banners invasivos)
- Integración en flujo de compra
- Medible (tracking)

---

# 2. 🧱 BASE DE DATOS (SQL)

```sql
ALTER TABLE products
ADD COLUMN sponsor_name TEXT,
ADD COLUMN sponsor_logo TEXT,
ADD COLUMN sponsor_color TEXT,
ADD COLUMN sponsor_badge TEXT DEFAULT 'SPONSORED',
ADD COLUMN sponsor_url TEXT;
```

---

# 3. 🎨 PRODUCT CARD (index.html)

## Lógica JS (modificar productCard)

```js
const sponsorStyle = item.sponsor_color
 ? `style="box-shadow:0 0 0 1px ${item.sponsor_color},0 0 24px ${item.sponsor_color}33"`
 : '';

const sponsorLogo = item.sponsor_logo
 ? `<img class="sponsor-logo" src="${item.sponsor_logo}" alt="${item.sponsor_name}">`
 : '';

const sponsorBadge = item.sponsor_name
 ? `<span class="sponsor-badge">${item.sponsor_badge || 'SPONSORED'}</span>`
 : '';
```

## HTML dentro del card

```html
<article class="product-card sponsored" ${sponsorStyle}>
  <div class="product-media">
    ${media}
    ${sponsorLogo}
    ${sponsorBadge}
  </div>
```

---

# 4. 🎨 CSS SPONSOR

```css
.sponsor-logo{
  position:absolute;
  top:10px;
  right:10px;
  width:42px;
  height:42px;
  object-fit:contain;
  background:white;
  border-radius:10px;
  padding:6px;
  box-shadow:0 6px 18px rgba(0,0,0,.35);
}

.sponsor-badge{
  position:absolute;
  left:10px;
  bottom:10px;
  background:rgba(0,0,0,.7);
  color:#fff;
  font-size:10px;
  font-weight:900;
  padding:6px 8px;
  border-radius:6px;
  letter-spacing:.8px;
}
```

---

# 5. 🧠 CHECKOUT UPSELL (orders.js)

```js
const sponsorUpsell = {
 id:'pepsi500',
 name:'Pepsi 500ml',
 price:65
}

function renderUpsell(){
 return `
 <div class="upsell">
   <p>🔥 Agregá Pepsi por $65</p>
   <button onclick="addToCart('pepsi500')">Agregar</button>
 </div>
 `
}
```

---

# 6. 🧩 SPONSOR STRIP (index.html)

```html
<section class="sponsor-strip">
  <p>Partners oficiales</p>
  <div class="sponsor-logos">
    <img src="pepsi-logo.png">
    <img src="cabezas-logo.png">
  </div>
</section>
```

---

# 7. ⚙️ ADMIN PANEL (admin.html)

```html
<div>
   <label>Sponsor Name</label>
   <input type="text" id="editSponsorName">
</div>

<div>
   <label>Sponsor Logo URL</label>
   <input type="text" id="editSponsorLogo">
</div>

<div>
   <label>Sponsor Color</label>
   <input type="color" id="editSponsorColor">
</div>
```

---

# 8. 📊 TRACKING

```js
fbq('trackCustom', 'SponsorProductView', {
 sponsor:'Pepsi',
 product:'Pepsi 500ml'
});
```

---

# 9. 💰 MODELO DE NEGOCIO

Bronze:
- sponsor strip

Silver:
- product card
- combo destacado

Gold:
- landing dedicada
- upsell checkout

---

# 10. 🚀 SIGUIENTE NIVEL

- Landing exclusiva: /pepsi
- Dashboard de métricas
- A/B testing de combos

---

# 🔥 RESULTADO

Sistema listo para:
- Monetizar tráfico
- Vender sponsorships reales
- Aumentar conversión

Legendary Burger pasa de ser menú → plataforma publicitaria 🍔💸

