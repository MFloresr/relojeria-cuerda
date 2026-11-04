// Capa de acceso al contenido. Las páginas solo llaman a estas funciones.
// Hoy leen los archivos de src/content; para pasar al CMS (Sanity) basta con reescribir este archivo
// y devolver la misma forma de datos con consultas GROQ, sin tocar las páginas ni los componentes.
import { getCollection, getEntry } from 'astro:content';
import type { Reloj } from './util';

export async function getRelojes(): Promise<Reloj[]> {
  const relojes = await getCollection('relojes');
  return relojes.sort((a, b) => Number(b.data.destacado) - Number(a.data.destacado) || b.data.precio - a.data.precio);
}

export const getNuevos = async () => (await getRelojes()).filter((r) => r.data.estado === 'nuevo');
export const getVintage = async () => (await getRelojes()).filter((r) => r.data.estado === 'vintage');
export const getReloj = (id: string) => getEntry('relojes', id);

export async function getRelacionados(reloj: Reloj, n = 4): Promise<Reloj[]> {
  const todos = (await getRelojes()).filter((r) => r.id !== reloj.id);
  const puntos = (r: Reloj) => (r.data.categoria === reloj.data.categoria ? 2 : 0) + (r.data.estado === reloj.data.estado ? 1 : 0) + (r.data.marca === reloj.data.marca ? 1 : 0);
  return todos.sort((a, b) => puntos(b) - puntos(a)).slice(0, n);
}

export async function getEntradas() {
  return (await getCollection('blog')).sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export const getServicios = () => getCollection('servicios');
export const getEquipo = () => getCollection('equipo');
export const getOpiniones = () => getCollection('opiniones');
export const getPreguntas = async (tema?: string) => {
  const todas = await getCollection('preguntas');
  return tema ? todas.filter((p) => p.data.tema === tema) : todas;
};
