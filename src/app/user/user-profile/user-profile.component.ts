import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LocacionService } from '../../services/locacion.service';
import { Router } from '@angular/router';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  sidebarOpen = true;

  constructor(
    private userService: UserService,
    private locacionService: LocacionService,
    private router: Router,
    private favoritosServie: FavoritosService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);

      if (this.user?.IdRol === 1) {
        this.locacionService.getLocacionesByAdmin(this.user.IDUsuario).subscribe({
          next: (locaciones) => {
            this.user.locaciones = locaciones;
          },
          error: (err) => {
            console.error('Error al obtener locaciones del admin:', err);
            this.user.locaciones = [];
          }
        });
      }

      // Carga de favoritos usando el servicio correcto y método correcto
      this.favoritosServie.getFavoritosByUsuario(this.user.IDUsuario).subscribe({
        next: (favoritos) => {
          this.user.favoritos = favoritos.data || favoritos;
        },
        error: (err) => {
          console.error('Error al obtener favoritos:', err);
          this.user.favoritos = [];
        }
      });
    }
  }

  verDetalle(id: number): void {
    this.router.navigate(['/detalle-locacion', id]);
  }
}
