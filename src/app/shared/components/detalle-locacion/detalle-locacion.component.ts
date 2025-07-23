import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LocacionService } from '../../../services/locacion.service';
import { Locacion } from '../../../models/locacion.model';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalle-locacion',
  templateUrl: './detalle-locacion.component.html',
  styleUrls: ['./detalle-locacion.component.css']
})
export class DetalleLocacionComponent implements OnInit {
  isLoading = true;
  hasError = false;
  locacionId = 0;
  locacion: Locacion | null = null;
  userRating = 0;
  hoverRating = 0;
  showReportModal = false;

  constructor(
    private route: ActivatedRoute,
    private locacionesService: LocacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadLocacionData();
  }

  loadLocacionData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const idParam = params.get('id');
          this.locacionId = idParam ? Number(idParam) : 0;

          if (!this.locacionId) {
            this.hasError = true;
            return of(null);
          }

          return this.locacionesService.getLocacionById(this.locacionId).pipe(
            catchError((err) => {
              console.error('Error al obtener la locación:', err);
              this.hasError = true;
              return of(null);
            }),
            finalize(() => {
              this.isLoading = false;
            })
          );
        })
      )
      .subscribe({
        next: (locacion) => {
          if (locacion) {
            this.locacion = locacion;
          } else {
            this.hasError = true;
          }
        },
        error: () => {
          this.hasError = true;
          this.locacion = null;
        }
      });
  }

  getImageUrl(id: number): string {
    return `http://localhost:3000/locaciones/${id}/imagen`;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/imagen-fallback.jpg';
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
      this.locacionesService.calificarLocacion(this.locacion.IDLocacion, this.userRating).subscribe({
        next: (res) => {
          if (res && res.data) {
            this.locacion!.Puntaje = res.data.Puntaje;
            this.locacion!.TotalVotos = res.data.TotalVotos;
            alert(`Gracias por calificar. Nuevo promedio: ${res.data.Puntaje.toFixed(2)}⭐ basado en ${res.data.TotalVotos} voto(s)`);
          }
        },
        error: (err) => {
          console.error('Error al enviar calificación:', err);
          alert('Error al enviar la calificación.');
        }
      });
    }
  }

  openReportModal(): void {
    this.showReportModal = true;
  }

  sendReport(reportData: any): void {
    console.log('Reporte enviado:', {
      locacionId: this.locacionId,
      tipoReporte: reportData.type,
      motivoReporte: reportData.reason,
      fechaInicio: reportData.start
    });
    this.showReportModal = false;
    alert('Reporte enviado exitosamente');
  }

  retryLoad(): void {
    this.loadLocacionData();
  }

  irAAgendarVisita(): void {
    this.router.navigate(['/agendar-visita']);
  }
}
