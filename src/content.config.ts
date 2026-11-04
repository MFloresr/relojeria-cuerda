// Esquemas del contenido. Cada colección equivale a un tipo de documento del futuro CMS (Sanity):
// relojes, entradas del blog y datos sueltos (servicios, equipo, opiniones, preguntas).
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIAS = ['buceo', 'vestir', 'campo', 'digital', 'deportivo', 'diario'] as const;
export const MOVIMIENTOS = ['automatico', 'cuarzo', 'solar', 'digital'] as const;

const relojes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/relojes' }),
  schema: ({ image }) =>
    z.object({
      marca: z.string(),
      modelo: z.string(),
      categoria: z.enum(CATEGORIAS),
      movimiento: z.enum(MOVIMIENTOS),
      estado: z.enum(['nuevo', 'vintage']),
      diametro: z.number(), // mm
      grosor: z.number(), // mm
      entreasas: z.number(), // mm, de asa a asa
      atm: z.number(), // hermeticidad en atmósferas (10 atm = 100 m)
      cristal: z.string(),
      caja: z.string(),
      correa: z.string(),
      anchoCorrea: z.number(),
      peso: z.number(), // g
      precio: z.number(),
      precioAnterior: z.number().optional(),
      stock: z.number().int(),
      foto: image(),
      fotoAlt: z.string(),
      ajuste: z.enum(['contain', 'cover']).default('contain'), // 'cover' para fotos apaisadas o de ambiente
      destacado: z.boolean().default(false),
      novedad: z.boolean().default(false),
      resumen: z.string(),
      descripcion: z.string(),
      extras: z.array(z.string()).default([]),
      garantiaMeses: z.number().default(36),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string(),
      fecha: z.coerce.date(),
      categoria: z.string(),
      foto: image(),
      fotoAlt: z.string(),
      minutos: z.number(),
    }),
});

const servicios = defineCollection({
  loader: file('src/content/datos/servicios.json'),
  schema: z.object({ nombre: z.string(), descripcion: z.string(), desde: z.number(), plazo: z.string(), incluye: z.array(z.string()) }),
});

const equipo = defineCollection({
  loader: file('src/content/datos/equipo.json'),
  schema: z.object({ nombre: z.string(), cargo: z.string(), texto: z.string() }),
});

const opiniones = defineCollection({
  loader: file('src/content/datos/opiniones.json'),
  schema: z.object({ nombre: z.string(), compra: z.string(), texto: z.string() }),
});

const preguntas = defineCollection({
  loader: file('src/content/datos/preguntas.json'),
  schema: z.object({ tema: z.enum(['compra', 'envios', 'garantia', 'taller', 'vintage']), pregunta: z.string(), respuesta: z.string() }),
});

export const collections = { relojes, blog, servicios, equipo, opiniones, preguntas };
