import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Reporte {
  IDReporte?: number;
  IDUsuarioReportante: number;
  IDPropiedadReportado: number;
  IDDueñoReportado: number;
  Detalle: string;
  Estado?: string;
  FechaReporte?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private API = 'http://localhost:3000'; // Cambia por tu base URL si es necesario

  constructor(private http: HttpClient) { }

  // Crear nuevo reporte
  crearReporte(reporte: Reporte): Observable<any> {
    return this.http.post(`${this.API}/reporte`, reporte);
  }

  // Obtener todos los reportes con info completa
  obtenerReportes(): Observable<any> {
    return this.http.get(`${this.API}/reporte`);
  }

  // Actualizar estado de un reporte por ID
  actualizarEstadoReporte(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.API}/reportes/${id}`, { Estado: estado });
  }
}
