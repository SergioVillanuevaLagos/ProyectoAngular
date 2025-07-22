import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuarioLogueado = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      (logged: boolean) => this.usuarioLogueado = logged
    );
  }

  cerrarSesion() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
