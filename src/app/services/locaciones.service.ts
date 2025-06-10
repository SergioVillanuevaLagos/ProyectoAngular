// src/app/services/locaciones.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Locacion } from '../models/locacion.model';

@Injectable({
  providedIn: 'root'
})
export class LocacionesService {
  private locaciones: Locacion[] = [
    {
      IDLocacion: 1,
      Area: 120,
      Habitaciones: 3,
      Imagen: 101,
      Ubicacion: 'Providencia, Santiago',
      Descripcion: 'Departamento moderno con excelente conectividad.',
      PrecioMensual: 750000,
      IDAdmin: 2,
      TipoLocacion: 1,
      Puntaje: 4.5,
      lat: -33.4378,
      lng: -70.6505
    },
    {
      IDLocacion: 2,
      Area: 80,
      Habitaciones: 2,
      Imagen: 102,
      Ubicacion: 'Ñuñoa, Santiago',
      Descripcion: 'Ideal para parejas o estudiantes.',
      PrecioMensual: 550000,
      IDAdmin: 3,
      TipoLocacion: 2,
      Puntaje: 4.2,
      lat: -33.4569,
      lng: -70.6100
    },
    {
      IDLocacion: 3,
      Area: 200,
      Habitaciones: 5,
      Imagen: 103,
      Ubicacion: 'Las Condes, Santiago',
      Descripcion: 'Amplia casa familiar con jardín.',
      PrecioMensual: 1200000,
      IDAdmin: 4,
      TipoLocacion: 1,
      Puntaje: 4.8,
      lat: -33.4175,
      lng: -70.5836
    },
    {
      IDLocacion: 4,
      Area: 250,
      Habitaciones: 15,
      Imagen: 1,
      Ubicacion: 'Las mariposas, Chillán',
      Descripcion: 'Casa habitación con amplio jardín.',
      PrecioMensual: 100000,
      IDAdmin: 15,
      TipoLocacion: 1,
      Puntaje: 5,
      lat: -36.6064,
      lng: -72.1034
    },
  ];

  constructor() {}

  getLocaciones(): Observable<Locacion[]> {
    return of(this.locaciones);
  }
}
