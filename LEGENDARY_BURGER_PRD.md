# 🍔 LEGENDARY BURGER — PRD & ESTRUCTURA TÉCNICA COMPLETA
### Product Requirements Document · MVP · Mayo 2026

---

## 1. RESUMEN EJECUTIVO

| Campo | Detalle |
|---|---|
| **Cliente** | Legendary Burger |
| **Producto** | Sitio web + menú online · Mobile First |
| **Referencia** | www.hdp.uy (superar en diseño y funcionalidad) |
| **Objetivo** | Presencia digital premium que genere pedidos y fidelice clientes |
| **Alcance MVP** | Landing page + Menú interactivo + Carrito básico |
| **Timeline estimado** | 2–3 semanas |
| **Stack** | HTML/CSS/JS puro (desplegable en cualquier hosting estático) |

---

## 2. IDENTIDAD DE MARCA — LEGENDARY BURGER

### 2.1 Análisis del logo
- **Nombre:** LEGENDARY BURGER
- **Año fundación:** 2024
- **Estética del logo:** Retro-cartoon / Street food / Mascota burger animada
- **Colores del logo:** Naranja (#F97316), Negro (#111), Violeta/Índigo (#4B3F8B), Blanco
- **Personalidad:** Divertida, audaz, con carácter propio · NO pretenciosa

### 2.2 Paleta de colores propuesta

```css
--black:       #0D0D0D   /* fondo principal */
--dark:        #141414   /* superficies / cards */
--panel:       #1C1C1C   /* nav, modales */
--border:      #2E2E2E   /* separadores */
--orange:      #F97316   /* acento primario (del logo) */
--orange-deep: #EA580C   /* hover / estados activos */
--purple:      #4B3F8B   /* acento secundario (del logo) */
--purple-light:#7C6FCD   /* hover púrpura */
--cream:       #FEF3C7   /* texto alternativo / badges */
--gray:        #6B7280   /* texto secundario */
--white:       #FFFFFF   /* texto principal */
--red:         #EF4444   /* errores / cerrado */
--green:       #22C55E   /* abierto / confirmaciones */
```

**Regla:** Fondo negro profundo · Naranja como acento dominante · Púrpura como acento de soporte · Sin gradientes genéricos

### 2.3 Tipografía

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| **Display** | Bebas Neue | 400 | Títulos hero, nombre restaurante |
| **Heading** | Barlow Condensed | 700/900 | Subtítulos, nombres de productos |
| **Body** | Barlow | 300/400 | Descripciones, precios, textos |
| **Accent** | — | — | No aplica |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## 3. INVENTARIO DE ASSETS

### 3.1 Imágenes del cliente (carpeta LEGENDARY)

| Archivo | Producto sugerido | Categoría |
|---|---|---|
| `Big Legend.jpg` / `Big Legend 2.jpg` | Big Legend | Clásico / Estrella |
| `Triple Chesse 1/2/3.jpg` | Triple Cheese | Especiales |
| `Texas Crispy.jpg` / `Texas Crispy 2.jpg` | Texas Crispy | Especiales |
| `Crispy Bacon.jpg` | Crispy Bacon | Clásicos |
| `Crispy MIX.jpg` | Crispy Mix | Especiales |
| `Only Chesse.jpg` | Only Cheese | Clásicos |
| `Vegetariana LGY.jpg` | Burger Veggie | Veggie |
| `Mila Americana.jpg` | Milanesa Americana | Especiales |
| `chivito legendario.jpg` | Chivito Legendario | Especiales |
| `kid.jpg` | Kid Burger | Clásicos |
| `napo.jpg` | Napolitana | Especiales |
| `fritas.jpg` | Papas Fritas | Acompañamientos |
| `fritas cheddar.jpg` | Papas Cheddar | Acompañamientos |
| `papas cheddar bacon.jpg` | Papas Cheddar Bacon | Acompañamientos |
| `Oniong Rings 1/2/3.jpg` | Aros de Cebolla | Acompañamientos |
| `logo.jpeg` | Logo oficial | Branding |

### 3.2 Estructura de carpetas del proyecto

```
legendary-burger/
│
├── index.html              ← Landing page principal
├── menu.html               ← Página de menú completo
│
├── assets/
│   ├── images/
│   │   ├── logo.jpeg
│   │   ├── products/       ← Todas las fotos de productos
│   │   └── branding/       ← Banner hero, texturas
│   ├── css/
│   │   ├── main.css        ← Variables, reset, base
│   │   ├── components.css  ← Cards, navbar, modales
│   │   └── animations.css  ← Keyframes, transiciones
│   └── js/
│       ├── main.js         ← Lógica general, scroll, navbar
│       ├── menu.js         ← Filtros, tabs, carrito
│       └── cart.js         ← Estado del carrito, localStorage
│
└── README.md
```

---

## 4. ARQUITECTURA DE PÁGINAS

### 4.1 index.html — Landing Page

```
┌─────────────────────────────────────┐
│  NAVBAR (sticky, logo + links + CTA)│
├─────────────────────────────────────┤
│  HERO SECTION                       │
│  • Imagen/video background          │
│  • Logo grande + tagline            │
│  • Badge giratorio (EST. 2024)      │
│  • CTA: "VER MENÚ" + "PEDIR AHORA" │
│  • Ticker horizontal animado        │
├─────────────────────────────────────┤
│  STRIP DE DATOS                     │
│  • #1 en smash burgers · 2024 · etc │
├─────────────────────────────────────┤
│  FEATURED PRODUCTS (carousel)       │
│  • 3-4 burgers destacadas con foto  │
│  • Swipe en mobile                  │
├─────────────────────────────────────┤
│  PROPUESTA DE VALOR                 │
│  • "Por qué somos legendarios"      │
│  • 3 iconos: Calidad · Precio · Alma│
├─────────────────────────────────────┤
│  LOCALES / CONTACTO                 │
│  • Cards con dirección y horarios   │
│  • Link a Google Maps               │
├─────────────────────────────────────┤
│  FOOTER                             │
│  • Logo + redes + copyright         │
└─────────────────────────────────────┘
```

### 4.2 menu.html — Menú Completo

```
┌─────────────────────────────────────┐
│  NAVBAR                             │
├─────────────────────────────────────┤
│  BANNER MENÚ (header compacto)      │
├─────────────────────────────────────┤
│  TABS (sticky)                      │
│  ESPECIALES · CLÁSICOS · VEGGIE     │
│  ACOMPAÑAMIENTOS · BEBIDAS          │
├─────────────────────────────────────┤
│  HORARIOS (card con estado abierto) │
├─────────────────────────────────────┤
│  GRID DE PRODUCTOS                  │
│  • 1 col mobile · 2 col tablet      │
│  • Cards: foto + nombre + desc + $  │
│  • Botón "+" para agregar carrito   │
├─────────────────────────────────────┤
│  CARRITO FLOTANTE (FAB)             │
│  • Badge con cantidad               │
│  • Panel deslizable desde abajo     │
│  • Botón "Confirmar pedido"         │
└─────────────────────────────────────┘
```

---

## 5. MENÚ DE PRODUCTOS (datos listos para usar)

### ESPECIALES
| Nombre | Descripción | Precio UYU |
|---|---|---|
| Big Legend | La estrella de la casa · 2 smash patties · cheddar doble · salsa legendaria · pepinillos | $550 |
| Triple Cheese | 3 smash patties · triple cheddar · cebolla caramelizada · mayo | $620 |
| Texas Crispy | Smash patty · pollo crispy · cheddar · jalapeño · BBQ | $580 |
| Chivito Legendario | Smash patty · jamón · morrón · huevo · lechuga · tomate · mayo | $600 |
| Crispy MIX | Smash patty + pechuga crispy · doble cheddar · coleslaw · BBQ | $590 |
| Mila Americana | Milanesa de res · cheddar · lechuga · tomate · pepinillos | $570 |
| Napo | Smash patty · salsa napolitana · cheddar · morrón | $540 |

### CLÁSICOS
| Nombre | Descripción | Precio UYU |
|---|---|---|
| Big Legend Clásica | 1 smash patty · cheddar · pepinillos · ketchup · mostaza | $390 |
| Only Cheese | 2 smash patties · cheddar x4 · mayo · ketchup | $470 |
| Crispy Bacon | 2 smash patties · cheddar · panceta · BBQ | $510 |
| Kid Burger | 1 smash patty · cheddar · mayo · ketchup | $320 |

### VEGGIE
| Nombre | Descripción | Precio UYU |
|---|---|---|
| Vegetariana LGY | Patty vegetal · cheddar · lechuga · tomate · cebolla · alioli | $490 |

### ACOMPAÑAMIENTOS
| Nombre | Descripción | Precio UYU |
|---|---|---|
| Papas Fritas | Crinkle cut · porción generosa | $140 |
| Papas Cheddar | Papas + salsa cheddar caliente | $210 |
| Papas Cheddar Bacon | Papas + cheddar + bacon crujiente | $270 |
| Aros de Cebolla | Aros crocantes · salsa ranch | $220 |

### BEBIDAS
| Nombre | Precio UYU |
|---|---|
| Coca-Cola 600ml | $140 |
| Coca-Cola Zero 600ml | $140 |
| Sprite 600ml | $140 |
| Fanta 600ml | $140 |
| Agua sin gas | $90 |
| Agua con gas | $90 |
| Cerveza artesanal | $260 |

---

## 6. COMPONENTES — ESPECIFICACIONES DETALLADAS

### 6.1 Navbar

```css
/* Comportamiento */
position: fixed;
top: 0;
z-index: 100;
background: transparent → rgba(13,13,13,0.95) al hacer scroll
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--border);
transition: all 0.3s ease;
```

**Elementos:**
- Logo (img 40px height)
- Links: Inicio · Menú · Locales
- CTA: Botón naranja "PEDIR AHORA"
- Mobile: hamburger → fullscreen overlay negro con links grandes

### 6.2 Hero Section

```
Layout mobile: columna centrada
Layout desktop: split 50/50

Elementos:
- Background: imagen producto con overlay dark gradient
- Eyebrow: "EST. 2024 · MONTEVIDEO"
- H1 en Bebas Neue: "LEGENDARY" (gigante, 120px+)
- Subtitle: "BURGER" en outline/stroke
- Badge circular giratorio animado (CSS rotate infinito)
- Descripción breve: 1 línea
- CTA primary: "VER MENÚ" (naranja)
- CTA secondary: "NUESTRA HISTORIA" (outline blanco)
- Ticker bottom: "LEGENDARY BURGER · SMASH BURGERS · EST. 2024 ·"
```

### 6.3 Product Card (Menú)

```html
<div class="product-card">
  <div class="card-image">
    <img src="..." alt="...">
    <button class="add-btn">+</button>
    <span class="badge">★ MÁS VENDIDO</span>
  </div>
  <div class="card-body">
    <h3>Nombre</h3>
    <p>Descripción</p>
    <div class="card-footer">
      <span class="price">$550</span>
      <button class="add-mobile">AGREGAR</button>
    </div>
  </div>
</div>
```

```css
/* Card styles */
background: var(--dark);
border: 1px solid var(--border);
border-radius: 16px;
overflow: hidden;
transition: transform 0.2s, border-color 0.2s;

/* Hover desktop */
&:hover {
  transform: translateY(-4px);
  border-color: var(--orange);
}
```

### 6.4 Sistema de Tabs (Menú)

```javascript
// Lógica de tabs
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.menu-section');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.category;
    
    // Highlight tab activo
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Scroll suave a la sección
    document.getElementById(target)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// IntersectionObserver para highlight tab al hacer scroll
```

### 6.5 Carrito (Cart)

```javascript
// Estado del carrito (localStorage)
const cart = {
  items: [],        // { id, name, price, qty, img }
  total: 0,
  count: 0
};

// Métodos
cart.add(productId)    // Agregar o incrementar
cart.remove(productId) // Decrementar o eliminar
cart.clear()           // Vaciar
cart.getTotal()        // Calcular total
cart.save()            // Guardar en localStorage
cart.load()            // Recuperar al iniciar
```

**UI del carrito:**
- FAB flotante (bottom-right, mobile)
- Badge con cantidad (naranja)
- Panel que sube desde abajo (mobile) o lateral (desktop)
- Lista de ítems con controles +/−
- Total destacado
- Botón "CONFIRMAR PEDIDO" → WhatsApp con mensaje armado automáticamente

### 6.6 WhatsApp Integration

```javascript
// Generar link de WhatsApp con el pedido
function generateWhatsAppLink(cart) {
  const phone = '59899XXXXXX'; // Número del cliente
  let message = '🍔 *NUEVO PEDIDO LEGENDARY BURGER*\n\n';
  
  cart.items.forEach(item => {
    message += `• ${item.name} x${item.qty} — $${item.price * item.qty}\n`;
  });
  
  message += `\n*TOTAL: $${cart.total}*`;
  message += '\n\n_Pedido generado desde legendaryburger.uy_';
  
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
```

---

## 7. ANIMACIONES & EFECTOS

| Efecto | Implementación | Trigger |
|---|---|---|
| Ticker horizontal | `@keyframes ticker { from: translateX(0) to: translateX(-50%) }` | Siempre |
| Fade-in al scroll | `IntersectionObserver` + clase `.visible` con `opacity/translateY` | Scroll |
| Badge giratorio | `@keyframes spin { to: rotate(360deg) }` | Siempre |
| Navbar blur | Listener `scroll`, clase `.scrolled` | Scroll > 80px |
| Card hover | `transform: translateY(-4px)` + `border-color: orange` | Hover |
| Botón + | `transform: scale(1.1)` + ripple effect | Click |
| Toast carrito | `translateY(100%) → 0` + timeout 2s | Add to cart |
| Hero image float | `@keyframes float { up/down 3px }` | Siempre |
| Mobile menu | Fullscreen overlay con `opacity` + `pointer-events` | Click hamburger |

---

## 8. INFORMACIÓN DE LOCALES

> ⚠️ El cliente debe confirmar estos datos. Usar como placeholder hasta confirmación.

### Local 1 (Principal)
- **Nombre:** Legendary Burger — (nombre del barrio)
- **Horario:** A confirmar con el cliente
- **Tel / WhatsApp:** A confirmar
- **Instagram:** A confirmar

---

## 9. RESPONSIVE DESIGN

### Breakpoints

```css
/* Mobile First */
/* Base: 0px → 767px (mobile) */
/* Tablet: 768px → 1099px */
/* Desktop: 1100px+ */

@media (min-width: 768px) { /* tablet */ }
@media (min-width: 1100px) { /* desktop */ }
```

### Comportamiento por breakpoint

| Elemento | Mobile | Tablet | Desktop |
|---|---|---|---|
| Navbar | Logo centrado + hamburger | Logo + links + CTA | Logo + links + CTA |
| Hero | 1 columna, imagen fondo | 1 columna, imagen lado | Split 50/50 |
| Grid menú | 1 columna | 2 columnas | 3 columnas |
| Tabs menú | Scroll horizontal | Visible completo | Visible completo |
| Carrito | Panel bottom (slide up) | Panel bottom | Sidebar derecha |
| Footer | 1 columna | 2 columnas | 4 columnas |

---

## 10. SEO & PERFORMANCE

### Meta tags

```html
<meta name="description" content="Legendary Burger — Las mejores smash burgers de Montevideo. Pedí online con delivery y takeaway.">
<meta name="keywords" content="burger, smash burger, montevideo, hamburguesas, delivery">
<meta property="og:title" content="Legendary Burger">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:url" content="https://legendaryburger.uy">
<meta name="theme-color" content="#F97316">
```

### Performance

- Imágenes: WebP + lazy loading (`loading="lazy"`)
- CSS: Crítico inline en `<head>`, resto diferido
- JS: `defer` en todos los scripts
- Fonts: `display=swap` en Google Fonts
- Sin frameworks pesados (vanilla JS puro)

---

## 11. FUNCIONALIDADES MVP vs FUTURO

### ✅ MVP (Entregar en esta fase)
- [x] Landing page completa (Hero + Featured + Info locales + Footer)
- [x] Página de menú con tabs por categoría
- [x] Cards de productos con foto, nombre, descripción y precio
- [x] Horario de atención (estático, configurable)
- [x] Carrito básico con localStorage
- [x] Integración WhatsApp para confirmar pedidos
- [x] Responsive mobile-first
- [x] Animaciones y micro-interacciones
- [x] SEO básico
- [x] Sin dependencias externas (despliegue inmediato)

### 🔮 Fase 2 (Post-MVP)
- [ ] Sistema de pedidos propio con backend
- [ ] Login / historial de pedidos
- [ ] Integración PedidosYa / Rappi
- [ ] CMS para gestión del menú (Sanity / Contentful)
- [ ] Analytics dashboard
- [ ] Programa de fidelización
- [ ] Notificaciones push

---

## 12. HOSTING & DEPLOY

### Opción A — GitHub Pages (Gratis, ideal para MVP)
```bash
git init
git add .
git commit -m "initial commit"
gh repo create legendary-burger --public
git push origin main
# Activar Pages en Settings → Pages → main branch
```

### Opción B — Netlify (Gratis, drag & drop)
- Ir a netlify.com
- Drag & drop la carpeta del proyecto
- Dominio custom gratuito: `legendary-burger.netlify.app`
- Dominio propio: conectar `legendaryburger.uy`

### Opción C — Vercel (Gratis, más rápido)
```bash
npm i -g vercel
vercel deploy
```

### Dominio recomendado
- `legendaryburger.uy` (si está disponible)
- `legendary.uy`
- `legendaryburguer.com.uy`

---

## 13. CHECKLIST DE ENTREGA

### Antes de entregar al cliente
- [ ] Confirmar datos de locales (dirección, horario, teléfono)
- [ ] Confirmar número de WhatsApp para pedidos
- [ ] Confirmar precios del menú
- [ ] Optimizar todas las imágenes a WebP (máx 200KB por imagen)
- [ ] Test en Chrome / Safari iOS / Chrome Android
- [ ] Validar que el link de WhatsApp funciona correctamente
- [ ] Verificar que todas las fuentes cargan bien
- [ ] Test de velocidad en PageSpeed Insights (target: >85 mobile)

### Assets que el cliente debe proveer
- [ ] Número de WhatsApp de pedidos
- [ ] Dirección exacta del/los local(es)
- [ ] Horarios de atención
- [ ] Link de Instagram oficial
- [ ] ¿Tiene dominio propio? ¿Cuál?
- [ ] ¿Quiere formulario de contacto? ¿Con qué email?

---

## 14. ESTIMACIÓN DE TIEMPO

| Tarea | Tiempo |
|---|---|
| Setup del proyecto + estructura de archivos | 2h |
| CSS variables + design system base | 2h |
| Navbar + Hero Section | 4h |
| Strip de datos + Propuesta de valor | 2h |
| Sección locales + Footer | 2h |
| Página de menú + Tabs | 4h |
| Cards de productos | 3h |
| Sistema de carrito + WhatsApp | 4h |
| Animaciones y micro-interacciones | 3h |
| Responsive y ajustes | 4h |
| Testing y optimización | 2h |
| **TOTAL** | **~32h (~1 semana)** |

---

*PRD generado · Legendary Burger · Mayo 2026*
*Basado en análisis de www.hdp.uy y assets del cliente*
