import { Component, OnInit } from '@angular/core';
import { ReportesService, Reporte } from '../../../services/reportes.service';

export type EstadoReporte = 'Pendiente' | 'Advertencia enviada' | 'Suspendido' | 'Resuelto';

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.css']
})
export class AdminReportesComponent implements OnInit {
  reportes: Reporte[] = [];
  estadoSeleccionado: { [key: number]: EstadoReporte } = {};
  mostrarConfirmacion = false;
  reporteSeleccionado?: Reporte;
  errorMessage = '';
  isLoading = false;

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.reportesService.getReportes().subscribe({
      next: (data) => {
        this.reportes = data;
        console.log('Reportes cargados:', this.reportes); // Para debugging
        this.reportes.forEach(r => {
          this.estadoSeleccionado[r.id] = r.estado as EstadoReporte;
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar reportes:', error);
        this.errorMessage = 'Error al cargar los reportes. Por favor, intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  cambiarEstado(event: Event, id: number) {
    const select = event.target as HTMLSelectElement;
    const valor = select.value as EstadoReporte;
    this.estadoSeleccionado[id] = valor;
  }

  abrirConfirmacion(reporte: Reporte) {
    this.reporteSeleccionado = reporte;
    this.mostrarConfirmacion = true;
  }

  cerrarConfirmacion() {
    this.mostrarConfirmacion = false;
    this.reporteSeleccionado = undefined;
  }

  aplicarCambioEstado() {
    if (!this.reporteSeleccionado) return;

    const nuevoEstado = this.estadoSeleccionado[this.reporteSeleccionado.id];
    
    this.reportesService.actualizarEstado(this.reporteSeleccionado.id, nuevoEstado).subscribe({
      next: () => {
        this.reporteSeleccionado!.estado = nuevoEstado;
        this.cerrarConfirmacion();
        alert(`Estado del reporte #${this.reporteSeleccionado!.id} actualizado a "${nuevoEstado}"`);
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado del reporte. Por favor, intente nuevamente.');
      }
    });
  }
}
