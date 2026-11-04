# Cuerda Relojería: tienda online de ejemplo

Tienda de relojes hecha con Astro 7, pensada como punto de partida para un cliente real. Todo el contenido (relojes, taller, equipo, opiniones, blog) es de ejemplo y sale de archivos que equivalen a los documentos de un CMS, para pasarla a Sanity sin rehacer las páginas.

## Qué incluye

- **Portada** con una esfera de reloj que marca la hora real (el segundero barre en continuo; con «reducir movimiento» salta cada segundo) y el buscador «¿Qué reloj me queda bien?» por contorno de muñeca, estilo y presupuesto.
- **Tienda** con 18 relojes y filtros por muñeca, estilo, movimiento, marca, resistencia al agua, estado, diámetro y precio. Los filtros quedan en la dirección y se pueden compartir.
- **Ficha de reloj**: ficha técnica, «cómo te queda» según tu muñeca, stock, IVA desglosado, comparador y datos estructurados (Product).
- **Carrito, pedido y confirmación** (modo demostración, sin cobros), **comparador** de hasta tres relojes.
- **Vintage** (piezas únicas con stock 1), **Correas y pilas**, **Taller** con cita online y precios, **Regalos** por presupuesto, **Guía de tallas**.
- Envíos y devoluciones, garantía, condiciones de venta, quiénes somos, contacto con «abierto ahora», blog (4 artículos), preguntas frecuentes con datos estructurados.
- Aviso legal, privacidad y cookies (plantillas), créditos de las fotos, 404, sitemap y `robots.txt`.

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview
```

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Relojes | `src/content/relojes/*.json` |
| Blog | `src/content/blog/*.md` |
| Servicios, equipo, opiniones, preguntas | `src/content/datos/*.json` |
| Datos del negocio (horario, envíos, IVA) | `src/lib/sitio.ts` |
| Esquemas del contenido | `src/content.config.ts` |
| Acceso al contenido (aquí entra el CMS) | `src/lib/contenido.ts` |
| Carrito y comparador | `src/lib/carrito.ts` (localStorage) |
| Datos para carrito y comparador | `/datos/relojes.json` (se genera al compilar) |
| Diseño | `src/styles/global.css` |
| Fotos | `src/assets/fotos/` · créditos en `src/lib/creditos.json` |

## Pasar el contenido a un CMS (Sanity)

Las páginas solo llaman a `src/lib/contenido.ts`. Para conectar Sanity:

1. Crear los tipos `reloj`, `entrada`, `servicio`, `persona`, `opinion`, `pregunta` y un documento único `ajustes`, con los mismos campos que `src/content.config.ts`.
2. Reescribir `contenido.ts` para devolver la misma forma de datos con consultas GROQ. La imagen pasa de `ImageMetadata` a una URL de `@sanity/image-url`.
3. Un webhook de Sanity que lance un nuevo despliegue al publicar. El stock debería salir de una fuente que se actualice en cada venta (ver abajo).

## Cobrar de verdad (pendiente)

Hoy el pedido no cobra nada ni se guarda en ningún sitio. Para vender online hay que añadir:

1. **Pasarela de pago** (por ejemplo, Stripe Checkout): una función en servidor que cree la sesión de pago con los importes del carrito, que **debe recalcular los precios en el servidor** y no fiarse de los del navegador.
2. **Registro de pedidos y stock**: un webhook de la pasarela que guarde el pedido, reste stock y envíe el correo de confirmación (por ejemplo, con Resend). Las piezas vintage, de stock 1, necesitan reservarse al empezar el pago.
3. **Facturación** y los textos legales de venta a distancia revisados por un asesor.

`PUBLIC_FORM_ENDPOINT` ya recibe los formularios de contacto y cita (y el pedido) como JSON; sin él funcionan en modo demostración.

## Antes de entregar al cliente

- [ ] Sustituir datos del negocio, relojes, precios, stock y fotos propias (las actuales son de ejemplo; las medidas técnicas son orientativas).
- [ ] Rellenar y revisar con su asesor aviso legal, condiciones de venta y privacidad (hay corchetes `[ ]` por completar).
- [ ] Conectar el pago y el registro de pedidos (apartado anterior).
- [ ] Si se añade analítica, mapa embebido o vídeos: actualizar la página de cookies y añadir un aviso con aceptar y rechazar.
- [ ] Cambiar el dominio en `astro.config.mjs`, `sitio.ts` y `robots.txt`.
- [ ] Quitar la franja verde «Web de demostración» del pie (`Pie.astro`).

## Fotos

Proceden de Wikimedia Commons (CC0, CC BY, CC BY-SA y dominio público), con autor y licencia de cada una en `/creditos/`. Son de calidad desigual: para producción conviene cambiarlas por fotos de producto propias o de un banco como Pexels o Unsplash, descargadas a mano.

## Calidad

Probada con axe-core (WCAG 2.2 A y AA y buenas prácticas): sin violaciones en las 43 páginas, en ordenador y móvil. La web no pone cookies ni contacta con dominios externos; solo guarda en el navegador el carrito y la comparación para que funcionen. Prueba de extremo a extremo (carrito, pedido, comparador y filtros) en `webs-clientes/_herramientas/flujo-tienda.cjs`.
