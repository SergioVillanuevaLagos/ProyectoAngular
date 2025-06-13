import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css'],
  standalone: true,
  imports: [CommonModule, GoogleMapsModule]
})
export class MapasComponent implements OnInit {
  @Input() lat!: number;
  @Input() lng!: number;

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 15;
  markers: { position: google.maps.LatLngLiteral; title: string }[] = [];

  ngOnInit(): void {
    if (this.lat && this.lng) {
      this.center = { lat: this.lat, lng: this.lng };
      this.markers.push({
        position: this.center,
        title: 'Ubicación de la locación'
      });
    }
  }
}
