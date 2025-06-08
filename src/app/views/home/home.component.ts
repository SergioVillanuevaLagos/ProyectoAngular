import { Component } from '@angular/core';
import { Locacion } from '../../models/locacion.model';
import { LocacionesService } from '../../services/locaciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    title = 'ProyectoAngular';
    filteredLocaciones: Locacion[] = [];
  allLocaciones: Locacion[] = [];

  constructor(private locacionesService: LocacionesService) {}

  ngOnInit(): void {
    this.locacionesService.getLocaciones().subscribe(data => {
      this.allLocaciones = data;
      this.filteredLocaciones = data;
    });
  }

  applyFilters(filters: any) {
    this.filteredLocaciones = this.allLocaciones.filter(loc => {
      const matchesSearch =
        loc.Ubicacion.toLowerCase().includes(filters.searchTerm) ||
        loc.Descripcion.toLowerCase().includes(filters.searchTerm);

      const matchesPrice =
        (filters.minPrice == null || loc.PrecioMensual >= filters.minPrice) &&
        (filters.maxPrice == null || loc.PrecioMensual <= filters.maxPrice);

      const matchesHabitaciones =
        filters.habitaciones == null || loc.Habitaciones === filters.habitaciones;

      return matchesSearch && matchesPrice && matchesHabitaciones;
    });
  }


}
