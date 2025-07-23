import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {
  @Input() lat: number = 0;
  @Input() lng: number = 0;
  
  zoom = 15;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  markers: any[] = [];
  
  ngOnInit() {
    if (this.lat && this.lng) {
      this.center = { lat: this.lat, lng: this.lng };
      this.markers = [
        {
          position: { lat: this.lat, lng: this.lng },
          title: 'Ubicación de la propiedad'
        }
      ];
    }
  }
}
