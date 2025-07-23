import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Reporte {
  id: number;
  usuarioReportante: number;
  propiedadReportada: number;
  duenoReportado: number;
  detalle: string;
  estado: string;
  fechaReporte: string;
  // Campos adicionales para mostrar información amigable en la interfaz
  nombreUsuario?: string;
  nombrePropiedad?: string;
  nombreDueno?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getReportes(): Observable<Reporte[]> {
    // Cambiamos de /reportes a /reporte para que coincida con el backend
    return this.http.get<{error: boolean, data: any[]}>(`${this.apiUrl}/reporte`)
      .pipe(
        map(response => {
          if (response.error) {
            throw new Error('Error al obtener reportes');
          }
          // Adaptar los nombres de campos del backend al formato del modelo Reporte
          return response.data.map(item => ({
            id: item.IDReporte,
            usuarioReportante: item.IDUsuarioReportante,
            propiedadReportada: item.IDPropiedadReportado,
            duenoReportado: item.IDDueñoReportado,
            detalle: item.Detalle,
            estado: item.Estado,
            fechaReporte: item.FechaReporte,
            // Usar los campos enriched que vienen del JOIN en el backend
            nombreUsuario: item.NombreUsuarioCompleto || item.NombreUsuario || `Usuario #${item.IDUsuarioReportante}`,
            nombrePropiedad: item.NombrePropiedad || `Propiedad #${item.IDPropiedadReportado}`,
            nombreDueno: item.NombreDueno || `Dueño #${item.IDDueñoReportado}`
          } as Reporte));
        })
      );
  }

  actualizarEstado(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/reportes/${id}`, { Estado: nuevoEstado });
  }
  
  crearReporte(reporteData: {
    IDUsuarioReportante: number;
    IDPropiedadReportado: number;
    IDDueñoReportado: number;
    Detalle: string;
    Estado?: string;
    FechaReporte?: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reporte`, reporteData);
  }
}