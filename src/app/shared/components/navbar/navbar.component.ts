import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';
import { AutenticacionGoogleService } from '../../../autenticacion-google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuarioLogueado = false;
  esAdmin = false;

  constructor(
    private authService: AuthService,
    private googleAuthService: AutenticacionGoogleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((logged: boolean) => {
      this.usuarioLogueado = logged;

      if (logged) {
        const user = JSON.parse(localStorage.getItem('user')!);
        console.log('Usuario logueado:', user);
        this.esAdmin = user?.IdRol === 1;
        console.log('¿Es admin?', this.esAdmin);
      } else {
        this.esAdmin = false;
      }
    });
  }

  cerrarSesion() {
    // Cierra sesión en Google y en la aplicación
    this.googleAuthService.logout();
    this.router.navigate(['/login']);
  }
}
