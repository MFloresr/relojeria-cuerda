// Carrito y comparador. Se guardan en el navegador (localStorage) solo para que funcionen: es almacenamiento
// estrictamente necesario para la compra y no lleva ningún dato personal ni sale del dispositivo.

export type Linea = { id: string; cantidad: number };
export type Resumen = {
  id: string; nombre: string; precio: number; stock: number; estado: string; foto: string; fotoAlt: string; marca: string;
  categoria: string; movimiento: string; diametro: number; grosor: number; entreasas: number; atm: number; cristal: string;
  caja: string; correa: string; anchoCorrea: number; peso: number; garantiaMeses: number;
};

const CLAVE_CARRITO = 'cuerda:carrito';
const CLAVE_COMPARAR = 'cuerda:comparar';
export const MAX_COMPARAR = 3;

const leer = <T>(clave: string, defecto: T): T => {
  try { const v = localStorage.getItem(clave); return v ? (JSON.parse(v) as T) : defecto; } catch { return defecto; }
};
const guardar = (clave: string, valor: unknown) => {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch { /* sin almacenamiento: el carrito no se conserva */ }
};

export const leerCarrito = () => leer<Linea[]>(CLAVE_CARRITO, []);
export const leerComparar = () => leer<string[]>(CLAVE_COMPARAR, []);

export function guardarCarrito(lineas: Linea[]) {
  guardar(CLAVE_CARRITO, lineas);
  document.dispatchEvent(new CustomEvent('cuerda:carrito'));
}
export function guardarComparar(ids: string[]) {
  guardar(CLAVE_COMPARAR, ids);
  document.dispatchEvent(new CustomEvent('cuerda:comparar'));
}

export function anadir(id: string, stock: number): boolean {
  const lineas = leerCarrito();
  const l = lineas.find((x) => x.id === id);
  if (l) { if (l.cantidad >= stock) return false; l.cantidad += 1; } else lineas.push({ id, cantidad: 1 });
  guardarCarrito(lineas);
  return true;
}

export const totalArticulos = () => leerCarrito().reduce((s, l) => s + l.cantidad, 0);

let catalogo: Promise<Resumen[]> | null = null;
export function cargarCatalogo(): Promise<Resumen[]> {
  catalogo ??= fetch('/datos/relojes.json').then((r) => r.json());
  return catalogo;
}

export const formatoEuros = (n: number) => {
  const s = Number.isInteger(n) ? new Intl.NumberFormat('es-ES', { useGrouping: 'always' }).format(n) : new Intl.NumberFormat('es-ES', { useGrouping: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  return `${s} €`;
};
