export interface Locacion {
  IDLocacion: number;
  Area: number;
  Habitaciones: number;
  Imagen: any;
  Ubicacion: string;
  Descripcion: string;
  PrecioMensual: number;
  IDAdmin: number;
  TipoLocacion: number;
  Puntaje: number;
  Banos: number;
  TotalVotos: number;
  ReglasCasa: string;
  ServiciosIncluidos: string;

  // Nuevas propiedades para el mapa
  lat: number;
  lng: number;
}
