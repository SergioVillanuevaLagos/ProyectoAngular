import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-location-filter-sidebar',
  templateUrl: './location-filter-sidebar.component.html',
  styleUrls: ['./location-filter-sidebar.component.css']
})
export class LocationFilterSidebarComponent {
  @Output() filterChanged = new EventEmitter<any>();

  searchTerm: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  habitaciones: number | null = null;

  onFilterChange() {
    this.filterChanged.emit({
      searchTerm: this.searchTerm.toLowerCase(),
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      habitaciones: this.habitaciones
    });
  }
}
