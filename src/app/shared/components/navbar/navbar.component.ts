import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuarioLogueado = false;
  esAdmin = false;

  constructor(private authService: AuthService) { }

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
    this.authService.logout();
    window.location.href = '/login';
  }
}
