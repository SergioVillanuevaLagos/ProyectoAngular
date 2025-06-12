import { Component, Input, OnInit } from '@angular/core';
import { Locacion } from '../../../models/locacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-locaciones',
  templateUrl: './listar-locaciones.component.html',
  styleUrls: ['./listar-locaciones.component.css']
})
export class ListarLocacionesComponent implements OnInit {
  @Input() filteredLocaciones: Locacion[] | null = null;

  locaciones: Locacion[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.filteredLocaciones) {

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

  goToDetalle(id: number) {
    this.router.navigate(['/detalle-locacion', id]);
  }
}
