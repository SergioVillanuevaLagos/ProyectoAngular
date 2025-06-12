import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionGoogleService } from '../../../autenticacion-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private autenticacionGoogleService: AutenticacionGoogleService, private router: Router) { }

  login() {
    this.autenticacionGoogleService.login();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
