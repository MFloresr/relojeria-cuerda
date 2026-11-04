// Datos mínimos de todos los relojes para el carrito y el comparador, servidos como archivo estático.
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { getRelojes } from '../../lib/contenido';
import { resumenReloj } from '../../lib/util';

export const GET: APIRoute = async () => {
  const relojes = await getRelojes();
  const datos = await Promise.all(
    relojes.map(async (r) => {
      const img = await getImage({ src: r.data.foto, width: 300, format: 'webp' });
      return resumenReloj(r, img.src);
    }),
  );
  return new Response(JSON.stringify(datos), { headers: { 'Content-Type': 'application/json' } });
};
