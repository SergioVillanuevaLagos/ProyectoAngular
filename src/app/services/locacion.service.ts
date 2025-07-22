import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class LocacionService {
  constructor(private http: HttpClient) { }

  getLocaciones(): Observable<any> {
    return this.http.get(`${API}/locaciones`);
  }

  getLocacionById(id: number): Observable<any> {
    return this.http.get(`${API}/locaciones/${id}`);
  }

  crearLocacion(data: any): Observable<any> {
    return this.http.post(`${API}/locaciones`, data);
  }

  actualizarLocacion(id: number, data: any): Observable<any> {
    return this.http.put(`${API}/locaciones/${id}`, data);
  }

  eliminarLocacion(id: number): Observable<any> {
    return this.http.delete(`${API}/locaciones/${id}`);
  }
}
