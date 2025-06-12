import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocacionesService } from '../../../services/locaciones.service';
import { Locacion } from '../../../models/locacion.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-locacion',
  templateUrl: './detalle-locacion.component.html',
  styleUrls: ['./detalle-locacion.component.css']
})
export class DetalleLocacionComponent implements OnInit {
  locacionId: number = 0;
  locacion: Locacion | undefined;
  userRating: number = 0;
  hoverRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private locacionesService: LocacionesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.locacionId = Number(params.get('id'));
      this.loadLocacion();
    });
  }

  loadLocacion(): void {
    this.locacionesService.getLocaciones().subscribe((locaciones) => {
      this.locacion = locaciones.find(l => l.IDLocacion === this.locacionId);
    });
  }

  getImageUrl(imagenId: number): string {
    return `https://picsum.photos/seed/${imagenId}/200/140`
  }



setUserRating(rating: number) {
  this.userRating = rating;
}

setHoverRating(rating: number) {
  this.hoverRating = rating;
}

clearHoverRating() {
  this.hoverRating = 0;
}

submitRating() {
  if(this.userRating > 0) {
    alert(`Gracias por calificar con ${this.userRating} estrella(s).`);
    // Aquí puedes agregar lógica para enviar la calificación a un backend o actualizar datos
  }
}
}
