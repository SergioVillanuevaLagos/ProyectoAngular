import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocacionService } from '../../../services/locacion.service';
import { Locacion } from '../../../models/locacion.model';

@Component({
  selector: 'app-admin-locaciones',
  templateUrl: './admin-locaciones.component.html',
  styleUrl: './admin-locaciones.component.css'
})
export class AdminLocacionesComponent {
  locaciones: Locacion[] = [];
  mostrarModalImagen = false;
  idImagenActual: number | null = null;
  cargandoImagen = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private locacionesService: LocacionService // Inyecta el servicio aquí
  ) {}

  ngOnInit(): void {
    this.obtenerLocaciones();
  }

  obtenerLocaciones(): void {
    this.http.get<any>('http://localhost:3000/locaciones').subscribe({
      next: (res) => {
        if (!res.error && Array.isArray(res.data)) {
          this.locaciones = res.data;
        } else {
          this.locaciones = [];
        }
      },
      error: (err) => {
        console.error('Error al obtener locaciones:', err);
        this.locaciones = [];
      }
    });
  }

  verImagen(imagenId: number): void {
    this.idImagenActual = imagenId;
    this.cargandoImagen = true;
    this.mostrarModalImagen = true;
  }

  imagenCargada(): void {
    this.cargandoImagen = false;
  }

  cerrarModal(): void {
    this.mostrarModalImagen = false;
    this.idImagenActual = null;
    this.cargandoImagen = false;
  }

  getImageUrl(imagenId: number): string {
    return `http://localhost:3000/locaciones/${imagenId}/imagen`;
  }

  verDetalle(id: number): void {
    this.router.navigate(['/detalle-locacion', id]);
  }

  editarLocacion(id: number): void {
    this.router.navigate(['/editar-locacion', id]);
  }

  eliminarLocacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta locación?')) {
      this.locacionesService.eliminarLocacion(id).subscribe({
        next: () => {
          // Vuelve a consultar la lista tras eliminar
          this.obtenerLocaciones();
          alert('Locación eliminada correctamente');
        },
        error: () => alert('Error al eliminar la locación')
      });
    }
  }
}
