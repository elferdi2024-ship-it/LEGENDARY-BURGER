# 🍔 PRD — Panel de Cocina en Vivo
## Legendary Burger · Sistema de Pedidos en Tiempo Real

**Versión:** 1.0  
**Fecha:** Mayo 2026  
**Archivos entregados:** `orders.js` · `pedidos.html` · `orders_table.sql`

---

## Índice

1. [Visión general](#1-visión-general)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Paso a paso: Supabase](#3-paso-a-paso-supabase)
4. [Paso a paso: Integración en index.html](#4-paso-a-paso-integración-en-indexhtml)
5. [Paso a paso: Instalar el panel](#5-paso-a-paso-instalar-el-panel)
6. [Configuración de credenciales](#6-configuración-de-credenciales)
7. [Flujo completo de un pedido](#7-flujo-completo-de-un-pedido)
8. [Funcionalidades del panel](#8-funcionalidades-del-panel)
9. [Responsive: TV, tablet, celular](#9-responsive-tv-tablet-celular)
10. [Notificaciones de nuevo pedido](#10-notificaciones-de-nuevo-pedido)
11. [Troubleshooting](#11-troubleshooting)
12. [Mejoras futuras](#12-mejoras-futuras)

---

## 1. Visión general

### ¿Qué se construyó?

Un sistema completo de gestión de pedidos estilo McDonald's con dos componentes:

| Componente | Archivo | ¿Qué hace? |
|---|---|---|
| **Guardado de pedidos** | `orders.js` | Cuando el cliente confirma, guarda en Supabase Y abre WhatsApp |
| **Panel de cocina** | `pedidos.html` | Pantalla interactiva con estados en tiempo real |
| **Base de datos** | `orders_table.sql` | Crea la tabla en Supabase con todo configurado |

### Flujo de estados

```
🆕 NUEVO  →  🔥 EN PREPARACIÓN  →  ✅ LISTO  →  📦 ENTREGADO
```

- **NUEVO**: El pedido acaba de entrar, suena un ding y la tarjeta aparece
- **EN PREPARACIÓN**: Cocina lo tomó, está en curso
- **LISTO**: Listo para retirar o entregar
- **ENTREGADO**: Cerrado (sigue visible hoy, desaparece mañana)

### ¿Cómo es la pantalla del panel?

El panel es un tablero Kanban de 4 columnas (como Trello pero para cocina). Cada tarjeta muestra:

```
┌─────────────────────────────────────────┐
│ #A1B2C3    🛵 Envío       hace 3 min   │
│─────────────────────────────────────────│
│ Juan Pérez                              │
│ 099 123 456 · Av. Italia 1234           │
│─────────────────────────────────────────│
│ 2x Legendary Double         $900        │
│   └ ❌ Sin tomate                       │
│ 1x Papas Cheddar Bacon      $250        │
│─────────────────────────────────────────│
│ 💵 Efectivo (paga $1000)    $1150       │
│ 📝 Timbre 2, bien cocidas               │
│─────────────────────────────────────────│
│ [→ Iniciar preparación]           [✕]  │
└─────────────────────────────────────────┘
```

---

## 2. Arquitectura del sistema

```
CLIENTE (navegador web)
  │
  │  Confirma pedido en index.html
  ▼
orders.js
  ├── Guarda en Supabase (tabla: orders)
  └── Abre WhatsApp con la comanda
  
SUPABASE (base de datos en la nube)
  │
  │  Realtime (WebSocket)
  ▼
pedidos.html (panel de cocina)
  ├── Escucha INSERT → nueva tarjeta + sonido
  └── Escucha UPDATE → mueve tarjeta entre columnas
  
COCINA (actualiza estados)
  │
  │  Click en botón o drag & drop
  ▼
Supabase UPDATE → todos los paneles conectados se actualizan en < 1 segundo
```

**Tecnologías:**
- Frontend: HTML + CSS + JavaScript vanilla (sin frameworks)
- Backend: Supabase (PostgreSQL + Realtime WebSocket)
- Auth del panel: verificación de credenciales desde `site_config`
- WhatsApp: API pública `wa.me` (sin costo)

---

## 3. Paso a paso: Supabase

### 3.1 Crear la tabla orders

1. Ir a [supabase.com](https://supabase.com) → tu proyecto
2. Menú izquierdo → **SQL Editor**
3. Click **New query**
4. Pegar el contenido completo de `orders_table.sql`
5. Click **Run** (o Ctrl+Enter)

Vas a ver en verde: `Success. No rows returned`

### 3.2 Verificar la tabla

1. Menú izquierdo → **Table Editor**
2. Buscar la tabla `orders`
3. Debería aparecer con todas las columnas

### 3.3 Habilitar Realtime

> ⚠️ Este paso es crítico para que el panel se actualice en tiempo real.

1. Menú izquierdo → **Database** → **Replication**
2. En la sección "Source tables", buscar `orders`
3. Hacer toggle a **ON**

Alternativa (si el SQL ya lo hizo): el comando `ALTER TABLE orders REPLICA IDENTITY FULL;` ya lo configura.

### 3.4 Verificar RLS

1. Menú izquierdo → **Authentication** → **Policies**
2. Seleccionar tabla `orders`
3. Deberías ver 3 políticas:
   - `orders_insert_anon` → permite crear pedidos
   - `orders_select_anon` → permite leer pedidos
   - `orders_update_anon` → permite cambiar el estado

Si no aparecen, corrés el SQL de nuevo o las creás manualmente desde la UI.

---

## 4. Paso a paso: Integración en index.html

### 4.1 Agregar orders.js

En tu `index.html`, justo **después** de la línea que carga `cart.js`:

```html
<script src="cart.js"></script>
<script src="orders.js"></script>   <!-- ← agregar esta línea -->
```

Si `cart.js` y la lógica del carrito están dentro de un `<script>` inline (todo junto), pegá el contenido de `orders.js` al **final** de ese bloque, después de `// ── Event Listeners ───`.

### 4.2 Verificar el override

Abrí la consola del navegador (F12) y deberías ver:

```
[orders.js] ✅ sendOrder() con Supabase registrado correctamente.
```

Si no aparece ese mensaje, `orders.js` no se cargó correctamente.

### 4.3 Probar el flujo

1. Agregá algo al carrito en tu web
2. Completá los datos del formulario
3. Click en "Confirmar pedido"
4. Click en "Enviar por WhatsApp" en el modal
5. Verificar que WhatsApp se abre normalmente
6. Ir a Supabase → Table Editor → `orders`
7. Debería aparecer el pedido con `status = 'nuevo'`

---

## 5. Paso a paso: Instalar el panel

### 5.1 Subir el archivo

Subí `pedidos.html` al mismo servidor donde está tu `index.html`.

**Ejemplos según tu hosting:**

| Hosting | ¿Cómo subir? |
|---|---|
| Netlify | Arrastrar al drag-and-drop deploy |
| Vercel | Copiar en la carpeta del proyecto y redeploy |
| cPanel/FTP | Subir con FileZilla a la carpeta `public_html` |
| GitHub Pages | Commit y push del archivo |

### 5.2 Acceder al panel

La URL va a ser: `https://tusitio.com/pedidos.html`

Si querés que sea `https://tusitio.com/pedidos` (sin `.html`):
- En Netlify: crear un archivo `_redirects` con: `/pedidos /pedidos.html 200`
- En Vercel: en `vercel.json` agregar rewrite de `/pedidos` a `/pedidos.html`

### 5.3 Login inicial

Al entrar a `/pedidos.html`, vas a ver la pantalla de login.

- **Usuario por defecto:** `admin`
- **Contraseña por defecto:** `legendary2024`

> ⚠️ Cambiá estas credenciales en Supabase antes de usar en producción (ver sección 6).

### 5.4 Modo TV / pantalla de cocina

Para usar en una TV o monitor fijo:
1. Abrí Chrome/Edge en la TV
2. Navegá a la URL del panel
3. Hacé login
4. Presioná F11 (pantalla completa)
5. El panel se actualiza automáticamente, no hace falta tocar nada más

---

## 6. Configuración de credenciales

Las credenciales del panel se guardan en la tabla `site_config` de Supabase.

### Cambiar usuario y contraseña

1. Ir a Supabase → **Table Editor** → `site_config`
2. Buscar las filas con `key = 'panel_user'` y `key = 'panel_pass'`
3. Hacer click en el valor → editar → guardar

O desde el SQL Editor:
```sql
UPDATE site_config SET value = 'mi_usuario'   WHERE key = 'panel_user';
UPDATE site_config SET value = 'mi_contraseña' WHERE key = 'panel_pass';
```

### ¿Dónde se verifica el login?

El panel carga las credenciales desde Supabase cada vez que alguien intenta hacer login. No están hardcodeadas en el HTML (excepto los valores por defecto como fallback).

### Sesión del panel

Después de hacer login exitoso, la sesión se guarda en `sessionStorage` del navegador. Esto significa:
- Si cerrás la pestaña y la volvés a abrir → te pide login de nuevo
- Si recargás la página (F5) → sigue logueado
- Si abrís el panel en una nueva pestaña → te pide login de nuevo

Esto es intencional por seguridad básica.

---

## 7. Flujo completo de un pedido

### Desde el cliente (web)

```
1. El cliente arma su pedido en index.html
2. Completa sus datos y método de pago
3. Click "Confirmar pedido" → se abre el modal de previsualización
4. Click "Enviar por WhatsApp" → orders.js ejecuta dos cosas en paralelo:
   a. Guarda el pedido en Supabase (tabla: orders, status: 'nuevo')
   b. Abre WhatsApp con la comanda formateada
5. El carrito se vacía automáticamente
```

### Desde el panel de cocina

```
6. El panel recibe el INSERT via Realtime WebSocket (< 1 segundo)
7. Suena "ding-ding-ding" (3 notas)
8. Aparece el toast "🍔 Nuevo pedido de [nombre]!"
9. La tarjeta aparece en la columna NUEVO con animación
10. El cocinero hace click en "→ Iniciar preparación"
11. La tarjeta se mueve a EN PREPARACIÓN
12. Cuando está listo: click "✓ Marcar listo"
13. La tarjeta pasa a LISTO (cliente puede ser avisado por WA manualmente)
14. En entrega: "📦 Marcar entregado"
15. La tarjeta queda en ENTREGADO hasta el fin del día
```

### Desde WhatsApp (respaldo)

El texto de la comanda llega igual que antes. Si Supabase falla por algún motivo, el pedido igual llega por WhatsApp y no se pierde.

---

## 8. Funcionalidades del panel

### Tablero Kanban

- **4 columnas** fijas: Nuevo / En preparación / Listo / Entregado
- **Ordenamiento**: dentro de cada columna, los pedidos más antiguos aparecen primero (los que llevan más tiempo esperando)
- **Badge de conteo**: cada columna muestra cuántos pedidos tiene

### Tarjetas de pedido

Cada tarjeta muestra:
- ✦ Código corto del pedido (últimos 6 chars del UUID)
- ✦ Modalidad: 🛵 Envío / 🏪 Retiro
- ✦ Tiempo transcurrido ("hace 3min") → se actualiza automáticamente cada 30 segundos
- ✦ Nombre y teléfono del cliente
- ✦ Dirección (si es envío)
- ✦ Lista de items con cantidades y precios
- ✦ Ingredientes removidos en rojo
- ✦ Método de pago + vuelto si es efectivo
- ✦ Notas del cliente
- ✦ Total del pedido

### Alerta de urgencia

Si un pedido lleva más de 15 minutos en el mismo estado, el tiempo cambia a **rojo**.

### Avanzar estados

**En desktop/TV:**
- Drag & drop de la tarjeta a la columna siguiente
- O click en el botón de acción en la tarjeta

**En tablet/celular:**
- Click en el botón de acción (más fácil con dedos)
- Drag & drop también funciona

### Eliminar pedido

Cada tarjeta activa tiene un botón ✕ para eliminar el pedido del panel (pide confirmación). Útil para pedidos cancelados o errores.

### Stats en tiempo real

El encabezado muestra contadores live:
- 🆕 X nuevos
- 🔥 X en preparación  
- ✅ X listos
- 📦 X entregados hoy

### Reloj

El encabezado muestra la hora actual, útil cuando la pantalla está en modo TV (el navegador no tiene barra de título visible).

---

## 9. Responsive: TV, tablet, celular

| Pantalla | Columnas | Columna status en scroll |
|---|---|---|
| TV / monitor ≥ 1200px | 4 columnas lado a lado | Sticky en el tope de cada columna |
| Tablet 680–1200px | 2 columnas (2+2) | Sticky |
| Celular < 680px | 1 columna por vez (scroll vertical) | Sticky |

**Para TV:** modo pantalla completa + Chrome kiosk es lo ideal. La UI está pensada para funcionar sin necesidad de interacción con la barra del navegador.

**Para tablet:** la cocina puede tener una tablet montada y avanzar estados con los dedos.

**Para celular:** el dueño puede revisar los pedidos desde su celular desde cualquier lado.

---

## 10. Notificaciones de nuevo pedido

### Sonido

Al llegar un nuevo pedido, el panel reproduce automáticamente 3 notas musicales (do-mi-sol). El sonido se genera con Web Audio API, no requiere ningún archivo de audio.

> ⚠️ Los navegadores modernos bloquean el audio hasta que el usuario interactúe con la página. La primera vez que abras el panel, hacé un click en cualquier parte de la pantalla para "desbloquear" el audio.

### Toast visual

Aparece un banner naranja en la esquina superior derecha: `🍔 Nuevo pedido de [Nombre]!` por 3.5 segundos.

### Animación de la tarjeta

La nueva tarjeta aparece con un flash naranja para llamar la atención.

### Notificaciones del navegador (opcional, a implementar)

Para habilitar notificaciones del sistema (que funcionen incluso con la pestaña en segundo plano):

```javascript
// Agregar en initPanel() en pedidos.html
Notification.requestPermission();

// Agregar en el handler de nuevo pedido
if (Notification.permission === 'granted') {
  new Notification('🍔 Nuevo pedido!', {
    body: `${order.customer_name} · $${order.total}`,
    icon: 'logo.jpeg'
  });
}
```

---

## 11. Troubleshooting

### El pedido no aparece en Supabase

1. Abrir consola del navegador (F12 → Console) en la web del cliente
2. Buscar errores de `[orders.js]`
3. Causas comunes:
   - La tabla `orders` no existe → correr el SQL de nuevo
   - RLS no configurado → verificar las políticas
   - `orders.js` se cargó antes que `cart.js` → verificar orden de scripts

### El panel no recibe pedidos en tiempo real

1. Verificar que Realtime está habilitado en Supabase (ver sección 3.3)
2. En la consola del panel buscar: `[panel] Realtime conectado ✅`
3. Si no aparece, hay un error de conexión → verificar SUPABASE_URL y SUPABASE_KEY en `pedidos.html`

### El login no funciona

1. Verificar que `panel_user` y `panel_pass` existen en `site_config`
2. Si las filas no existen, crearlas manualmente en Table Editor o con SQL:
   ```sql
   INSERT INTO site_config (key, value) VALUES ('panel_user', 'admin'), ('panel_pass', 'legendary2024');
   ```
3. El SQL de `orders_table.sql` ya incluye un `INSERT ... ON CONFLICT DO NOTHING` para esto

### El drag & drop no funciona en touch

El drag & drop HTML5 nativo tiene soporte limitado en touch. En dispositivos touch, usar los **botones de avance de estado** en la tarjeta (son la forma primaria de interacción en mobile/tablet).

### Los sonidos no funcionan

El navegador requiere interacción previa del usuario. Hacer click una vez en cualquier parte del panel antes de que llegue el primer pedido.

---

## 12. Mejoras futuras

### Corto plazo (1–2 días de desarrollo)

- **Tiempo estimado de espera**: mostrar al cliente "~30 min" cuando confirma
- **Confirmación automática por WA**: con WhatsApp Business API, enviar mensaje al cliente cuando se pasa a "Listo" (ej: "Tu pedido está listo para retirar 🎉")
- **Filtro por fecha**: ver pedidos de días anteriores en el panel
- **Contador de tiempo en preparación**: reloj visible en cada tarjeta mostrando cuánto tiempo lleva en ese estado

### Mediano plazo (1–2 semanas)

- **Autenticación real con Supabase Auth**: múltiples usuarios con roles (admin/cocina/delivery)
- **Historial de pedidos**: sección de reportes con totales por día/semana
- **Ticket de impresora**: generar comanda para impresora térmica (compatible con ESC/POS vía ePOS-Print o similar)
- **Asignar repartidor**: campo para indicar quién hace la entrega

### Largo plazo

- **App nativa**: convertir el panel a PWA (Progressive Web App) para instalar en dispositivos
- **Integración con Google Maps**: mostrar la ruta del delivery en el panel
- **Tiempos promedio**: analytics de cuánto tarda cada estado
- **Multi-local**: soporte para múltiples sucursales con su propio panel
- **Pagos online**: integrar MercadoPago Checkout Pro y marcar el pedido como "pago confirmado"

---

## Resumen de archivos

| Archivo | Dónde va | Qué hace |
|---|---|---|
| `orders.js` | Mismo servidor que `index.html` | Guarda pedidos en Supabase al confirmar |
| `pedidos.html` | Mismo servidor que `index.html` | Panel de cocina con login y tiempo real |
| `orders_table.sql` | Supabase SQL Editor | Crea la tabla y configura todo |

## Checklist de implementación

- [ ] Correr `orders_table.sql` en Supabase SQL Editor
- [ ] Verificar Realtime habilitado en tabla `orders`
- [ ] Agregar `<script src="orders.js"></script>` en `index.html` (después de `cart.js`)
- [ ] Subir `pedidos.html` al servidor
- [ ] Probar login en `tusitio.com/pedidos.html`
- [ ] Cambiar credenciales por defecto en Supabase (`panel_user` / `panel_pass`)
- [ ] Hacer un pedido de prueba y verificar que aparece en el panel
- [ ] Probar avanzar estados y ver que se actualiza en tiempo real
- [ ] Montar en TV/tablet de cocina y configurar pantalla completa

---

*Legendary Burger · Sistema de Pedidos v1.0 · Mayo 2026*
