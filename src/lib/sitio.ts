// Datos del negocio. En producción vendrían del CMS (un documento "Ajustes del sitio").
// Todo lo marcado como ejemplo se sustituye por los datos reales del cliente.

export type Horario = { etiqueta: string; tramos: { abre: string; cierra: string }[] };

export const sitio = {
  nombre: 'Cuerda Relojería',
  eslogan: 'Relojería independiente: relojes, correas y taller',
  descripcion:
    'Relojes nuevos y vintage, correas, pilas y taller propio. Te ayudamos a elegir el que mejor te queda según tu muñeca y tu uso.',
  url: 'https://www.cuerdarelojeria.example',
  // Datos de ejemplo
  telefono: '+34933000000',
  telefonoVisible: '933 00 00 00',
  whatsapp: '34600000000',
  email: 'hola@cuerdarelojeria.example',
  direccion: { calle: 'Carrer de Mostra, 8', cp: '08003', ciudad: 'Barcelona', provincia: 'Barcelona' },
  mapa: 'https://www.openstreetmap.org/search?query=Barcelona',
  endpointFormularios: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
  envio: { gratisDesde: 60, estandar: 3.95, express: 7.95, plazoEstandar: '2 a 4 días laborables', plazoExpress: '24 horas' },
  iva: 21,
  horarios: [
    { etiqueta: 'Lunes a viernes', tramos: [{ abre: '10:00', cierra: '14:00' }, { abre: '16:30', cierra: '20:00' }] },
    { etiqueta: 'Sábados', tramos: [{ abre: '10:30', cierra: '14:30' }] },
    { etiqueta: 'Domingos', tramos: [] },
  ] as Horario[],
  semana: {
    0: [],
    1: [['10:00', '14:00'], ['16:30', '20:00']],
    2: [['10:00', '14:00'], ['16:30', '20:00']],
    3: [['10:00', '14:00'], ['16:30', '20:00']],
    4: [['10:00', '14:00'], ['16:30', '20:00']],
    5: [['10:00', '14:00'], ['16:30', '20:00']],
    6: [['10:30', '14:30']],
  } as Record<number, string[][]>,
  responsableLegal: {
    razonSocial: '[Razón social del cliente]',
    nif: '[NIF]',
    registro: '[Datos del Registro Mercantil]',
    domicilio: 'Carrer de Mostra, 8, 08003 Barcelona',
  },
};

export const menu = [
  { href: '/tienda/', texto: 'Tienda' },
  { href: '/vintage/', texto: 'Vintage' },
  { href: '/correas/', texto: 'Correas y pilas' },
  { href: '/taller/', texto: 'Taller' },
  { href: '/regalos/', texto: 'Regalos' },
  { href: '/guia-muneca/', texto: 'Guía de tallas' },
  { href: '/blog/', texto: 'Blog' },
];
