import { Component } from '@angular/core';

export type EstadoReporte = 'Pendiente' | 'Advertencia enviada' | 'Suspendido' | 'Resuelto';

interface Reporte {
  id: number;
  usuario: string;
  motivo: string;
  fecha: string;
  estado: EstadoReporte;
}

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.css']
})
export class AdminReportesComponent {
  reportes: Reporte[] = [
    { id: 1, usuario: 'Juan Pérez', motivo: 'Ruido excesivo', fecha: '2025-06-10', estado: 'Pendiente' },
    { id: 2, usuario: 'María López', motivo: 'Pago atrasado', fecha: '2025-06-11', estado: 'Advertencia enviada' },
    { id: 3, usuario: 'Carlos Ruiz', motivo: 'Daño a propiedad', fecha: '2025-06-12', estado: 'Suspendido' },
  ];

  estadoSeleccionado: { [key: number]: EstadoReporte } = {};
  mostrarConfirmacion = false;
  reporteSeleccionado?: Reporte;

  constructor() {
    this.reportes.forEach(r => {
      this.estadoSeleccionado[r.id] = r.estado;
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
    this.reporteSeleccionado.estado = nuevoEstado;

    this.cerrarConfirmacion();

    alert(`Estado del reporte #${this.reporteSeleccionado.id} actualizado a "${nuevoEstado}"`);
  }
}
