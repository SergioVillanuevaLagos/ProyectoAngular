import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { Locacion } from '../models/locacion.model';


const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class LocacionService {
  constructor(private http: HttpClient) { }

  getLocaciones(): Observable<any> {
    return this.http.get(`${API}/locaciones`);
  }

  getLocacionById(id: number): Observable<Locacion> {
    return this.http.get<{ error: boolean; data: Locacion }>(`${API}/locaciones/${id}`).pipe(
      map(response => response.data) // 👈 extraer solo el objeto locacion
    );
  }

  crearLocacion(data: FormData): Observable<any> {
    return this.http.post(`${API}/locaciones`, data);
  }

  actualizarLocacion(id: number, data: any): Observable<any> {
    return this.http.put(`${API}/locaciones/${id}`, data);
  }

  eliminarLocacion(id: number): Observable<any> {
    return this.http.delete(`${API}/locaciones/${id}`);
  }
}
