import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocacionService } from '../../../services/locacion.service';
import { Locacion } from '../../../models/locacion.model';

@Component({
  selector: 'app-listar-locaciones',
  templateUrl: './listar-locaciones.component.html',
  styleUrls: ['./listar-locaciones.component.css']
})
export class ListarLocacionesComponent implements OnInit {
  @Input() filteredLocaciones: Locacion[] | null = null;
  locaciones: Locacion[] = [];

  constructor(
    private router: Router,
    private locacionService: LocacionService
  ) { }

  ngOnInit(): void {
    if (!this.filteredLocaciones) {
      console.log('Cargando locaciones...');
      this.locacionService.getLocaciones().subscribe({
        next: (res) => {
          console.log('Respuesta de locaciones:', res);
          if (!res.error && Array.isArray(res.data)) {
            this.locaciones = res.data;
          } else {
            console.error('La respuesta no contiene un array de locaciones:', res);
          }
        },
        error: (err) => {
          console.error('Error en la petición de locaciones:', err);
        }
      });
    }
  }


  get displayLocaciones(): Locacion[] {
    return this.filteredLocaciones ?? this.locaciones;
  }

  getImageUrl(id: number): string {
    return `http://localhost:3000/locaciones/${id}/imagen`;
  }

  goToDetalle(id: number): void {
    this.router.navigate(['/detalle-locacion', id]);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/imagen-fallback.jpg'; 
  }
}
