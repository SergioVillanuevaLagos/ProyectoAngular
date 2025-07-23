import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/reportes.service';

export type EstadoReporte = 'Pendiente' | 'Advertencia enviada' | 'Suspendido' | 'Resuelto';

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.css']
})
export class AdminReportesComponent implements OnInit {
  reportes: any[] = []; 
  estadoSeleccionado: { [key: number]: EstadoReporte } = {};
  mostrarConfirmacion = false;
  reporteSeleccionado?: any; 
  errorMessage = '';
  isLoading = false;

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.reporteService.obtenerReportes().subscribe({
      next: (res) => {
        this.reportes = res.data;
        console.log('Reportes cargados:', this.reportes);
        this.reportes.forEach(r => {
          this.estadoSeleccionado[r.IDReporte] = r.Estado as EstadoReporte;
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

  abrirConfirmacion(reporte: any) {
    this.reporteSeleccionado = reporte;
    this.mostrarConfirmacion = true;
  }

  cerrarConfirmacion() {
    this.mostrarConfirmacion = false;
    this.reporteSeleccionado = undefined;
  }

  aplicarCambioEstado() {
    if (!this.reporteSeleccionado) return;

    const nuevoEstado = this.estadoSeleccionado[this.reporteSeleccionado.IDReporte];

    this.reporteService.actualizarEstadoReporte(this.reporteSeleccionado.IDReporte, nuevoEstado).subscribe({
      next: () => {
        this.reporteSeleccionado!.Estado = nuevoEstado;
        this.cerrarConfirmacion();
        alert(`Estado del reporte #${this.reporteSeleccionado!.IDReporte} actualizado a "${nuevoEstado}"`);
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
        alert('Error al actualizar el estado del reporte. Por favor, intente nuevamente.');
      }
    });
  }
}
