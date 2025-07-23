// src/app/services/locaciones.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Locacion } from '../models/locacion.model';

@Injectable({
  providedIn: 'root'
})
export class LocacionesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las locaciones desde la API
   */
  getLocaciones(): Observable<Locacion[]> {
    return this.http.get<{error: boolean, data: Locacion[]}>(`${this.apiUrl}/locaciones`)
      .pipe(
        map(response => {
          if (response.error) {
            throw new Error('Error al obtener locaciones');
          }
          return response.data;
        })
      );
  }

  /**
   * Obtiene una locación por su ID
   */
  getLocacionById(id: number): Observable<Locacion> {
    return this.http.get<{error: boolean, data: Locacion}>(`${this.apiUrl}/locaciones/${id}`)
      .pipe(
        map(response => {
          if (response.error) {
            throw new Error(`Error al obtener la locación con ID ${id}`);
          }
          return response.data;
        })
      );
  }

  /**
   * Crea una nueva locación
   */
  crearLocacion(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/locaciones`, formData);
  }

  /**
   * Actualiza una locación existente
   */
  actualizarLocacion(id: number, locacion: Partial<Locacion>): Observable<any> {
    return this.http.put(`${this.apiUrl}/locaciones/${id}`, locacion);
  }

  /**
   * Elimina una locación por su ID
   */
  eliminarLocacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/locaciones/${id}`);
  }
  
  /**
   * Califica una locación
   */
  calificarLocacion(id: number, puntaje: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/locaciones/${id}/calificar`, { Puntaje: puntaje });
  }
}