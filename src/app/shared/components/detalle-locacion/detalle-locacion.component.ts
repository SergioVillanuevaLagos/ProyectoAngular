import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocacionService } from '../../../services/locacion.service';
import { Locacion } from '../../../models/locacion.model';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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
  reportType = '';
  startDate = '';
  endDate = '';

  houseImages: string[] = [
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967291.jpg',
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967278.jpg',
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967284.jpg',
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967286.jpg'
  ];

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

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = Number(params.get('id'));
        this.locacionId = id;

        // Aquí pedimos solo la locación específica
        return this.locacionesService.getLocacionById(id).pipe(
          catchError(() => {
            this.hasError = true;
            return of(null); // Retorna null en caso de error
          }),
          finalize(() => this.isLoading = false)
        );
      })
    ).subscribe(locacion => {
      if (locacion) {
        this.locacion = locacion;
      } else {
        this.hasError = true;
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
      this.locacion.Puntaje = this.userRating;
      alert(`Gracias por calificar con ${this.userRating} estrella(s)`);
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

  retryLoad(): void {
    this.loadLocacionData();
  }

  irAAgendarVisita(): void {
    this.router.navigate(['/agendar-visita']);
  }

  getHouseImage(index: number): string {
    return this.houseImages[index % this.houseImages.length];
  }

  get serviciosIncluidosArray(): string[] {
    if (!this.locacion || !this.locacion.ServiciosIncluidos) return [];
    return this.locacion.ServiciosIncluidos.split(',').map(s => s.trim());
  }
}
