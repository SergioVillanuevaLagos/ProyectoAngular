import { Component } from '@angular/core';
import { AutenticacionGoogleService } from '../autenticacion-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private autenticacionGoogleService: AutenticacionGoogleService) { }

  login() {
    this.autenticacionGoogleService.login();
  }
}