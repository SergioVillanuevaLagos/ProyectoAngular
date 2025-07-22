import { Component, OnInit } from '@angular/core';
import { LocacionService } from '../../services/locacion.service';
import { Locacion } from '../../models/locacion.model';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  title = 'ProyectoAngular';
  filteredLocaciones: Locacion[] = [];
  allLocaciones: Locacion[] = [];

  constructor(private locacionesService: LocacionService) { }

  ngOnInit(): void {
    this.locacionesService.getLocaciones().subscribe({
      next: (res) => {
        if (!res.error && Array.isArray(res.data)) {
          this.allLocaciones = res.data;
          this.filteredLocaciones = res.data;
        } else {
          console.error('Respuesta inesperada del backend:', res);
        }
      },
      error: (err) => {
        console.error('Error cargando locaciones:', err);
      }
    });
  }

  applyFilters(filters: any) {
    this.filteredLocaciones = this.allLocaciones.filter(loc => {
      const matchesSearch =
        loc.Ubicacion.toLowerCase().includes(filters.searchTerm?.toLowerCase()) ||
        loc.Descripcion.toLowerCase().includes(filters.searchTerm?.toLowerCase());

      const matchesPrice =
        (filters.minPrice == null || loc.PrecioMensual >= filters.minPrice) &&
        (filters.maxPrice == null || loc.PrecioMensual <= filters.maxPrice);

      const matchesHabitaciones =
        filters.habitaciones == null || loc.Habitaciones === filters.habitaciones;

      return matchesSearch && matchesPrice && matchesHabitaciones;
    });
  }

}
