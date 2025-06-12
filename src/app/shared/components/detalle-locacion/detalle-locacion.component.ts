import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocacionesService } from '../../../services/locaciones.service';
import { Locacion } from '../../../models/locacion.model';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalle-locacion',
  templateUrl: './detalle-locacion.component.html',
  styleUrls: ['./detalle-locacion.component.css']
})
export class DetalleLocacionComponent implements OnInit {
  isLoading: boolean = true;
  hasError: boolean = false;
  locacionId: number = 0;
  locacion: Locacion | null = null;
  userRating: number = 0;
  hoverRating: number = 0;
  showReportModal: boolean = false;
  reportType: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private locacionesService: LocacionesService
  ) {}

  ngOnInit(): void {
    this.loadLocacionData();
  }

  loadLocacionData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.locacionId = Number(params.get('id'));
        return this.locacionesService.getLocaciones().pipe(
          catchError(() => {
            this.hasError = true;
            return of([]); // Retorna un array vacío en caso de error
          }),
          finalize(() => this.isLoading = false)
        );
      })
    ).subscribe({
      next: (locaciones) => {
        this.locacion = locaciones.find(l => l.IDLocacion === this.locacionId) || null;
        if (!this.locacion) {
          this.hasError = true;
        }
      },
      error: () => {
        this.hasError = true;
        this.locacion = null;
      }
    });
  }

  openReportModal(): void {
    this.showReportModal = true;
  }

  sendReport(reportData: any): void {
    console.log('Reporte enviado:', {
      locacionId: this.locacionId,
      tipoReporte: reportData.reportType,
      fechaInicio: reportData.startDate,
      fechaFin: reportData.endDate
    });

    this.showReportModal = false;
    alert('Reporte enviado exitosamente');
  }

  getImageUrl(imagenId: number): string {
    return `https://picsum.photos/seed/${imagenId}/600/400`;
  }

  setUserRating(rating: number): void {
    this.userRating = rating;
  }

  setHoverRating(rating: number): void {
    this.hoverRating = rating;
  }

  clearHoverRating(): void {
    this.hoverRating = 0;
  }

  submitRating(): void {
    if (this.userRating > 0 && this.locacion) {
      console.log(`Calificación ${this.userRating} para locación ${this.locacion.IDLocacion}`);

      if (this.locacion) {
        this.locacion.Puntaje = this.userRating;
      }

      alert(`Gracias por calificar con ${this.userRating} estrella(s)`);
    }
  }

  retryLoad(): void {
    this.loadLocacionData();
  }
}
