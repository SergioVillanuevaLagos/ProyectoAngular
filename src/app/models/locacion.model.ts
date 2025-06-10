export interface Locacion {
  IDLocacion: number;
  Area: number;
  Habitaciones: number;
  Imagen: number;
  Ubicacion: string;
  Descripcion: string;
  PrecioMensual: number;
  IDAdmin: number;
  TipoLocacion: number;
  Puntaje: number;

  // Nuevas propiedades para el mapa
  lat: number; 
  lng: number;
}
