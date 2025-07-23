import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LocacionService } from '../../../services/locacion.service';
import { FavoritosService } from '../../../services/favoritos.service';
import { Locacion } from '../../../models/locacion.model';
import { Reporte } from '../../../models/Reporte';
import { switchMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReporteService } from '../../../services/reportes.service';

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
  idUsuario: number = 0; // Remove hardcoded value
  esFavorito = false;

  houseImages: string[] = [
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967291.jpg',
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967278.jpg',
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967284.jpg',
    'https://img10.naventcdn.com/avisos/resize/9/01/46/64/67/30/1200x1200/1536967286.jpg'
  ];

  constructor(
    private route: ActivatedRoute,
    private locacionesService: LocacionService,
    private favoritosService: FavoritosService,
    private router: Router,
    private reporteService: ReporteService
  ) { }

  ngOnInit(): void {
    // Get user ID from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.idUsuario = userData.IDUsuario;
    }
    
    this.loadLocacionData();
  }

  loadLocacionData(): void {
    this.isLoading = true;
    this.hasError = false;

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = Number(params.get('id'));
        this.locacionId = id;

        return this.locacionesService.getLocacionById(id).pipe(
          catchError(() => {
            this.hasError = true;
            return of(null);
          }),
          finalize(() => (this.isLoading = false))
        );
      })
    ).subscribe(locacion => {
      if (locacion) {
        this.locacion = locacion;

        // Verificar si está en favoritos
        this.favoritosService.existeFavorito(this.idUsuario, locacion.IDLocacion).subscribe(resp => {
          this.esFavorito = resp.existe;
        });
      } else {
        this.hasError = true;
      }
    });
  }

  toggleFavorito(): void {
    if (!this.locacion) return;

    if (this.esFavorito) {
      this.favoritosService.eliminarFavorito(this.idUsuario, this.locacion.IDLocacion).subscribe(() => {
        this.esFavorito = false;
      });
    } else {
      this.favoritosService.agregarFavorito(this.idUsuario, this.locacion.IDLocacion).subscribe(() => {
        this.esFavorito = true;
      });
    }
  }

  openReportModal(): void {
    this.showReportModal = true;
  }
  sendReport(reportData: any): void {
    if (!this.locacion) return;

    const nuevoReporte: Reporte = {
      IDUsuarioReportante: this.idUsuario,
      IDPropiedadReportado: this.locacion.IDLocacion,
      IDDueñoReportado: this.locacion.IDAdmin || 0, 
      Detalle: reportData.reason,
      Estado: 'Pendiente',
      FechaReporte: reportData.start
    };

    this.reporteService.crearReporte(nuevoReporte).subscribe({
      next: (res) => {
        alert('Reporte enviado exitosamente');
        this.showReportModal = false;
      },
      error: (err) => {
        console.error('Error al enviar reporte:', err);
        alert('Error al enviar el reporte, inténtalo de nuevo');
      }
    });
  }

  getHouseImage(index: number): string {
    return this.houseImages[index % this.houseImages.length];
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
            alert(
              `Gracias por calificar. Nuevo promedio: ${res.data.Puntaje.toFixed(
                2
              )}⭐ basado en ${res.data.TotalVotos} voto(s)`
            );
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

  get serviciosIncluidosArray(): string[] {
    if (!this.locacion || !this.locacion.ServiciosIncluidos) return [];
    return this.locacion.ServiciosIncluidos.split(',').map((s) => s.trim());
  }
}
