import { Component } from '@angular/core';
import { LocacionesService } from './services/locaciones.service';
import { Locacion } from './models/locacion.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
