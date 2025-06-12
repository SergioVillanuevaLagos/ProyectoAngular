import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Locacion } from '../../../models/locacion.model';
import { LocacionesService } from '../../../services/locaciones.service';

@Component({
  selector: 'app-admin-locaciones',
  templateUrl: './admin-locaciones.component.html',
  styleUrls: ['./admin-locaciones.component.css']
})
export class AdminLocacionesComponent implements OnInit {
  locaciones: Locacion[] = [];
  mostrarModalImagen = false;
  idImagenActual: number | null = null;
  cargandoImagen = false;

  constructor(private router: Router, private locacionService: LocacionesService) {}

  ngOnInit(): void {
    this.obtenerLocaciones();
  }

  obtenerLocaciones(): void {
    this.locacionService.getAll().subscribe({
      next: (data) => this.locaciones = data,
      error: (err) => console.error('Error al obtener locaciones:', err)
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
    return `https://picsum.photos/seed/${imagenId}/500/350`;
  }

  verDetalle(id: number): void {
    this.router.navigate(['/detalle-locacion', id]);
  }

  editarLocacion(id: number): void {
    this.router.navigate(['/editar-locacion', id]);
  }

  eliminarLocacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta locación?')) {
      this.locacionService.deleteById(id).subscribe({
        next: () => {
          this.locaciones = this.locaciones.filter(l => l.IDLocacion !== id);
          alert('Locación eliminada correctamente');
        },
        error: () => alert('Error al eliminar la locación')
      });
    }
  }
}
