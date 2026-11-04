import type { CollectionEntry } from 'astro:content';

export type Reloj = CollectionEntry<'relojes'>;

export const NBSP = ' ';
const nf = new Intl.NumberFormat('es-ES', { useGrouping: 'always' });
const nf2 = new Intl.NumberFormat('es-ES', { useGrouping: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Precio: sin decimales si es entero, con dos si no (19,90 €). */
export const euros = (n: number) => `${Number.isInteger(n) ? nf.format(n) : nf2.format(n)}${NBSP}€`;
export const mm = (n: number) => `${nf.format(n)}${NBSP}mm`;
export const gramos = (n: number) => `${nf.format(n)}${NBSP}g`;

export const ETIQUETA_CATEGORIA: Record<string, string> = {
  buceo: 'Buceo',
  vestir: 'Vestir',
  campo: 'Campo y aventura',
  digital: 'Digital',
  deportivo: 'Deportivo',
  diario: 'Para todos los días',
};

export const ETIQUETA_MOVIMIENTO: Record<string, string> = {
  automatico: 'Automático',
  cuarzo: 'Cuarzo',
  solar: 'Solar',
  digital: 'Digital',
};

/** Qué significa cada movimiento, en una frase. */
export const AYUDA_MOVIMIENTO: Record<string, string> = {
  automatico: 'Se da cuerda con el movimiento de tu muñeca. Sin pila.',
  cuarzo: 'Funciona con una pila y es muy preciso.',
  solar: 'Se carga con la luz. No hay que cambiar pila.',
  digital: 'Pantalla de cristal líquido, con cronómetro y alarmas.',
};

/** Hermeticidad: 1 atm equivale a unos 10 metros. Solo es orientativo para el uso real. */
export function usoAgua(atm: number): string {
  if (atm >= 20) return 'Apto para bucear';
  if (atm >= 10) return 'Apto para nadar';
  if (atm >= 5) return 'Aguanta salpicaduras y lluvia';
  return 'Solo salpicaduras';
}
export const metros = (atm: number) => `${atm * 10}${NBSP}m`;

export const nombreReloj = (r: Reloj['data']) => `${r.marca} ${r.modelo}`;

/** Diámetro de caja recomendado para un contorno de muñeca (cm). Es una regla práctica, no una norma. */
export const diametroIdeal = (muneca: number) => 2.35 * muneca;

export type Encaje = 'ideal' | 'bien' | 'grande' | 'pequeno';
export function encaje(r: Reloj['data'], muneca: number): Encaje {
  const dif = r.diametro - diametroIdeal(muneca);
  if (Math.abs(dif) <= 2.5) return 'ideal';
  if (Math.abs(dif) <= 4.5) return 'bien';
  return dif > 0 ? 'grande' : 'pequeno';
}
export const ETIQUETA_ENCAJE: Record<Encaje, string> = {
  ideal: 'Te queda muy bien',
  bien: 'Te queda bien',
  grande: 'Te quedará grande',
  pequeno: 'Te quedará pequeño',
};

export const sinIva = (precio: number, iva = 21) => precio / (1 + iva / 100);

/** Datos mínimos de cada reloj para el carrito y el comparador (se sirven en /datos/relojes.json). */
export function resumenReloj(r: Reloj, foto: string) {
  const d = r.data;
  return {
    id: r.id,
    nombre: nombreReloj(d),
    precio: d.precio,
    stock: d.stock,
    estado: d.estado,
    foto,
    fotoAlt: d.fotoAlt,
    marca: d.marca,
    categoria: ETIQUETA_CATEGORIA[d.categoria],
    movimiento: ETIQUETA_MOVIMIENTO[d.movimiento],
    diametro: d.diametro,
    grosor: d.grosor,
    entreasas: d.entreasas,
    atm: d.atm,
    cristal: d.cristal,
    caja: d.caja,
    correa: d.correa,
    anchoCorrea: d.anchoCorrea,
    peso: d.peso,
    garantiaMeses: d.garantiaMeses,
  };
}
