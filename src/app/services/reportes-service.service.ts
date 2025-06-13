import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reporte } from '../models/Reporte';

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private reportes: Reporte[] = [
    {
      id: 1,
      locacionId: 101,
      tipo: 'Contenido inapropiado',
      estado: 'Pendiente',
      descripcion: 'Texto ofensivo en la descripción.',
      fecha: '2025-06-10',
      usuario: 'usuario1'
    },
    {
      id: 2,
      locacionId: 102,
      tipo: 'Fraude',
      estado: 'Advertencia enviada',
      descripcion: 'Información falsa sobre la ubicación.',
      fecha: '2025-06-09',
      usuario: 'usuario2'
    }
  ];

  getReportes(): Observable<Reporte[]> {
    return of(this.reportes);
  }

  actualizarEstado(id: number, nuevoEstado: string): Observable<void> {
    const reporte = this.reportes.find(r => r.id === id);
    if (reporte) reporte.estado = nuevoEstado as any;
    return of();
  }
}
