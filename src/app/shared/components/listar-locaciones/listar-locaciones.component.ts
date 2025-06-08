import { Component, Input, OnInit } from '@angular/core';
import { Locacion } from '../../../models/locacion.model';

@Component({
  selector: 'app-listar-locaciones',
  templateUrl: './listar-locaciones.component.html',
  styleUrls: ['./listar-locaciones.component.css']
})
export class ListarLocacionesComponent implements OnInit {
  @Input() filteredLocaciones: Locacion[] | null = null; 

  locaciones: Locacion[] = [];

  constructor() {}

  ngOnInit(): void {
    // Si prefieres, podrías eliminar la carga interna aquí, ya que el padre pasa las locaciones
    // Pero si quieres tener un fallback:
    if (!this.filteredLocaciones) {
      // Por ejemplo, cargar algo por defecto
      // O dejar vacío
      this.locaciones = [];
    }
  }

  get displayLocaciones(): Locacion[] {
    // Si llegan locaciones filtradas, usarlas, si no, usar las internas
    return this.filteredLocaciones ?? this.locaciones;
  }

  getImageUrl(imagenId: number): string {
    return `https://picsum.photos/seed/${imagenId}/200/140`;
  }
}
